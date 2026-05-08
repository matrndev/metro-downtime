import DowntimeDisplay from "@/components/DowntimeDisplay"
import Link from "next/link"
import { Alert } from "@/types/apiResponses";
import AlertCard from "@/components/AlertCard";
import RouteShortName from "@/components/RouteShortName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

async function getAlerts(routeId: string, start: number, end: number, lastDays: number) {
  let url = `http://localhost:8000/alerts/route/${routeId}?last_days=${lastDays || "30"}`;
  if (start && end) {
    url = `http://localhost:8000/alerts/route/${routeId}?start=${start}&end=${end}`;
  }
  const res = await fetch(url);
  return res.json();
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ routeId: string }>,
  searchParams: Promise<{ start: number, end: number, lastDays: number }>,
}) {
  const { routeId } = await params
  const { start, end, lastDays } = await searchParams
  const alerts = await getAlerts(routeId, start, end, lastDays);

  return (
    <div className="overflow-x-clip">
      <div className="container max-w-4xl mx-auto justify-center mt-10">
        <Link
          href="/"
          className=" px-3 py-2 bg-orange-600 text-sm font-medium rounded-xl hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
        >
          <FontAwesomeIcon icon={faArrowLeft}/>
        </Link>
        <h1 className="text-2xl font-bold my-4">Showing alerts in the last {lastDays || 30} days for <RouteShortName routeId={routeId} /></h1>
        <DowntimeDisplay route={routeId} chunkCount={lastDays || 30} chunkSizeHours={24} />

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