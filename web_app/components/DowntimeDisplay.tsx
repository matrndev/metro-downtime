import DowntimeSegment from "./DowntimeSegment"

const segmentCount = 30;

export default function DowntimeDisplay() {
    return (
        <div className="m-2 rounded-md border-2 border-lime-900 p-4">
            <div className="mb-2 text-sm font-medium text-lime-700">Last 30 days</div>
            <div className="flex items-stretch gap-1">
                {Array.from({ length: segmentCount }, (_, i) => (
                    <DowntimeSegment key={i} />
                ))}
            </div>
        </div>
    );
}