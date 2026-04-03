export default async function Downtime({ lineNumber, lastDays }: { lineNumber: string; lastDays: number }) {
    const data = await fetch(`http://localhost:8000/alerts/route/${lineNumber}/downtime?last_days=${lastDays}`);
    const alerts = await data.json();

    return (
        <>
            <p>Downtime for line {lineNumber}:</p>
            <ul className="list-disc list-inside pl-6 text-lime-600">
                <li>Seconds: {alerts.downtime_seconds} s</li>
                <li>Hours: {alerts.downtime_hours} h</li>
                <li>Percentage: {alerts.downtime_pct} %</li>
                <li>Incident count: {alerts.incident_count}</li>
            </ul>
        </>
    )
}