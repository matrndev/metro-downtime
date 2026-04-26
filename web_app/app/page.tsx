import DowntimeDisplay from "@/components/DowntimeDisplay";
import RouteSearchBox from "@/components/RouteSearchBox";
import { Alert } from "@/types/apiResponses";

async function getActiveAlerts(): Promise<Alert[]> {
  const res = await fetch("http://localhost:8000/alerts/route/*?last_days=1");
  return (await res.json()) as Alert[];
}

export default async function Home() {
  const activeAlerts: Alert[] = await getActiveAlerts();
  const routes: string[] = [
    ...new Set(
      activeAlerts.flatMap((alert: Alert) =>
        alert.informedEntity.map((entity) => entity.routeId)
      )
    ),
  ];


  return (
    <div className="container max-w-4xl mx-auto justify-center mt-10 px-1">
      <div className="my-4 mx-2">
        <RouteSearchBox />
      </div>
      <br /><br />
      <h1 className="text-2xl font-bold mx-2">Affected services in the past 24 hours:</h1>
      {routes.map((routeId) => (
        <DowntimeDisplay
          key={routeId}
          chunkCount={48}
          chunkSizeHours={0.5}
          route={routeId}
        />
      ))}
    </div>
  );
}