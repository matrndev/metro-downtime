import DowntimeSegment from "./DowntimeSegment"


export default async function DowntimeDisplay({ route, chunkSizeHours, chunkCount }: { route: string, chunkSizeHours: number, chunkCount: number }) {
    const data = await fetch(`http://localhost:8000/alerts/route/${route}/downtime/chunks?chunk_size_hours=${chunkSizeHours}&chunk_count=${chunkCount}`);
    let chunks = await data.json();
    chunks = chunks.reverse();
    console.log(chunks)
    return (
        <div className="m-2 rounded-md border border-lime-900 p-4">
            <p className="font-bold text-xl">{route}</p>
            <p className="mb-2 text-sm font-medium text-lime-700">Last 30 days</p>
            <div className="flex items-stretch gap-0.5">
                {Array.from({ length: chunks.length }, (_, i) => (
                    <DowntimeSegment key={i} alerts={chunks[i].alerts} tsStart={chunks[i].start} tsEnd={chunks[i].end} />
                ))}
            </div>
        </div>
    );
}