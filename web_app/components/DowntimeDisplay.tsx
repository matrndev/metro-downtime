interface Chunk {
    start: number;
    end: number;
    alertIds: Array<string>;
}

import DowntimeSegment from "./DowntimeSegment"


export default async function DowntimeDisplay({ route, chunkSizeHours, chunkCount }: { route: string, chunkSizeHours: number, chunkCount: number }) {
    const data = await fetch(`http://localhost:8000/alerts/route/${route}/downtime/chunks?chunk_size_hours=${chunkSizeHours}&chunk_count=${chunkCount}`);
    const json = await data.json();
    const alerts = json.alerts;
    const chunks = json.chunks.reverse();
    const lastDays = chunkSizeHours * chunkCount / 24;
    const importantDowntimeOnly = false; // todo: may be changed by user in the future
    const downtime = await getDowntime(route, lastDays, importantDowntimeOnly);

    return (
        <div className="m-2 rounded-md border border-lime-900 p-4">
            <p className="font-bold text-xl">{route}</p>
            <p className="text-sm text-gray-600 font-medium text-right"></p>
            <div className="flex items-stretch gap-0.5">
                {chunks.map((chunk: Chunk, i: number) => (
                    <DowntimeSegment
                        key={i}
                        alerts={chunk.alertIds.map((id: string) => alerts[id])}
                        tsStart={chunk.start}
                        tsEnd={chunk.end}
                    />
                ))}
            </div>
            <div className="text-right">
                <div className="relative inline-block group">
                    <p className="text-xs text-gray-500 font-medium cursor-default">
                        Availability: {Number(100 - downtime.downtime_pct)}% in the last {lastDays} day{lastDays !== 1 ? "s" : ""}
                    </p>
                    {downtime.downtime_pct > 0 && (
                        <div
                            className="
                                absolute right-0 top-full mt-2 w-max pointer-events-none
                                rounded-sm bg-gray-700 px-3 py-2 text-sm text-white
                                opacity-0 transition-opacity text-center z-50 text-right
                                group-hover:opacity-100 group-focus-within:opacity-100
                            "
                        >
                            This service has been unavailable for ~{Math.round(downtime.downtime_hours)} out of {chunkSizeHours * chunkCount} hours.
                            <br />
                            {downtime.incident_count} incident{downtime.incident_count !== 1 ? "s" : ""} active in the last {lastDays} day{lastDays !== 1 ? "s" : ""}.
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}

async function getDowntime(route: string, lastDays: number, importantOnly: boolean) {
    const data = await fetch(`http://localhost:8000/alerts/route/${route}/downtime?last_days=${lastDays}&filter_effects=${importantOnly ? '_important' : ""}`);
    const json = await data.json();
    return json;
}