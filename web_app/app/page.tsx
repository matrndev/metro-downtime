import AlertCard from "@/components/AlertCard";
import DowntimeDisplay from "@/components/DowntimeDisplay";
import { Alert } from "@/types/apiResponses";

async function getActiveAlerts(): Promise<Alert[]> {
  const res = await fetch("http://localhost:8000/alerts/route/*?last_days=0.5");
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
      
      <br /><br />

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