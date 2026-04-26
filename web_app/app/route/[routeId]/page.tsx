import DowntimeDisplay from "@/components/DowntimeDisplay"
import Link from "next/link"
import { Alert } from "@/types/apiResponses";
import AlertCard from "@/components/AlertCard";

async function getAlerts(routeId: string, start: number, end: number) {
  let url = `http://localhost:8000/alerts/route/${routeId}?`
  if (!start || !end) {
    url += "last_days=30"
  } else {
    url += `start=${start}&end=${end}`
  }
  const res = await fetch(url);
  return res.json();
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ routeId: string }>,
  searchParams: Promise<{ start: number, end: number }>,
}) {
  const { routeId } = await params
  const { start, end } = await searchParams
  const alerts = await getAlerts(routeId, start, end);

  return (
    <div className="overflow-x-clip">
      <div className="container max-w-4xl mx-auto justify-center mt-10">
        <Link href={"/"} className="text-center text-blue-500 underline">Home</Link>
        <DowntimeDisplay route={routeId} chunkCount={48} chunkSizeHours={0.5} />
        <DowntimeDisplay route={routeId} chunkCount={30} chunkSizeHours={24} />

        {!alerts || alerts.length === 0 ? (
          <p className="text-center text-stone-300">No alerts for this route.</p>
        ) : (
          alerts.map((alert: Alert) => (
            <AlertCard key={alert.id} alert={alert} changeOpacity={false} showDetailsLink={false} />
          ))
        )}
      </div>
    </div>

  )
}