import DowntimeSegment from "./DowntimeSegment"


export default async function DowntimeDisplay() {
    const data = await fetch("http://localhost:8000/alerts/route/L401/downtime/chunks?chunk_size_hours=24&chunk_count=30");
    let chunks = await data.json();
    chunks = chunks.reverse();
    console.log(chunks)
    return (
        <div className="m-2 rounded-md border-2 border-lime-900 p-4">
            <div className="mb-2 text-sm font-medium text-lime-700">Last 30 days</div>
            <div className="flex items-stretch gap-1">
                {Array.from({ length: chunks.length }, (_, i) => (
                    <DowntimeSegment key={i} alerts={chunks[i].alerts} />
                ))}
            </div>
        </div>
    );
}