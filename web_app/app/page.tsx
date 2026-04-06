import AlertCard from "@/components/AlertCard";
import DowntimeDisplay from "@/components/DowntimeDisplay";

async function getActiveAlerts() {
  const res = await fetch("http://localhost:8000/alerts/route/*?last_days=0.5");
  return res.json();
}

// todo: rewrite

export default async function Home() {
  const activeAlerts = await getActiveAlerts();

  // Flatten: one entry per route across all alerts
  const alertRoutes = activeAlerts.flatMap((alert: any) =>
    alert.informedEntity.map((entity: { routeId: string }) => ({
      alertId: alert.id,
      routeId: entity.routeId,
    }))
  );

  return (
    <div className="container max-w-4xl mx-auto justify-center mt-10 px-1">
      {alertRoutes.map(({ alertId, routeId }) => (
        <DowntimeDisplay
          key={`${alertId}-${routeId}`}
          chunkCount={48}
          chunkSizeHours={0.5}
          route={routeId}
        />
      ))}
      <br /><br /><br />
      <p className="pl-2">Last updated:</p>
      {activeAlerts.map((alert: any) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  );
}