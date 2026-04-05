import DowntimeDisplay from "@/components/DowntimeDisplay";

async function getActiveAlerts() {
  const res = await fetch("http://localhost:8000/alerts/all-active");
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
    <div className="container max-w-4xl mx-auto justify-center mt-10">
      <h1 className="text-2xl font-bold">Currently active:</h1>
      <br />
      {alertRoutes.map(({ alertId, routeId }) => (
        <DowntimeDisplay
          key={`${alertId}-${routeId}`}
          chunkCount={24}
          chunkSizeHours={1}
          route={routeId}
        />
      ))}
    </div>
  );
}