import AlertCard from "@/components/AlertCard";
import DowntimeDisplay from "@/components/DowntimeDisplay";

async function getActiveAlerts() {
  const res = await fetch("http://localhost:8000/alerts/route/*?last_days=1");
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
      <h1 className="text-2xl font-bold pl-2">Alerts in the last 24 hours:</h1>
      <br />
      {alertRoutes.map(({ alertId, routeId }) => (
        <DowntimeDisplay
          key={`${alertId}-${routeId}`}
          chunkCount={24}
          chunkSizeHours={1}
          route={routeId}
        />
      ))}
      <br /><br /><br />
      <p className="pl-2">Last updated:</p>
      {activeAlerts.map((alert: any) => (
        // <p key={alert.id} className="font-bold pl-2">{new Date(alert.lastUpdated * 1000).toLocaleString("en-GB")} -- <small className="text-xs text-clip font-normal">{alert.descriptionText.translation[0].text} <i className="text-red-700">(for {alert.informedEntity.map((entity: any) => entity.routeId).join(", ")})</i> <a className="underline text-blue-400 italic" href={alert.url.translation[0].text}>link to alert</a></small></p>
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  );
}