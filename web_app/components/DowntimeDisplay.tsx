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

    return (
        <div className="m-2 rounded-md border border-lime-900 p-4">
            <p className="font-bold text-xl">{route}</p>
            <div className="flex items-stretch gap-0.5 mt-3">
                {chunks.map((chunk: Chunk, i: number) => (
                    <DowntimeSegment
                        key={i}
                        alerts={chunk.alertIds.map((id: string) => alerts[id])}
                        tsStart={chunk.start}
                        tsEnd={chunk.end}
                    />
                ))}
            </div>
            <p className="text-xs text-gray-400 font-medium text-right">Last {chunkSizeHours * chunkCount / 24} days</p>
        </div>
    );
}