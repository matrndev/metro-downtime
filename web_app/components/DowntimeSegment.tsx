"use client";

interface Alert {
  id: string;
  cause: string;
  effect: string;
  descriptionText: {
    translation: {
      text: string;
    }[];
  };
}

export default function DowntimeSegment({ alerts, tsStart, tsEnd }: { alerts: Array<Alert>, tsStart: string, tsEnd: string }) {
  const tsStartFormatted = new Date(Number(tsStart) * 1000).toLocaleString();
  const tsEndFormatted = new Date(Number(tsEnd) * 1000).toLocaleString();

  return (
    <>
      <div className="relative group flex-1">
        <span
          className={
            "block h-8 text-sm " +
            (alerts.length === 0 ? "bg-green-500" : "bg-red-500")
          }
        />

        <div
          className="
            absolute left-1/2 top-full mt-2 w-max max-w-xs pointer-events-none
            -translate-x-1/2 rounded-sm bg-gray-700 px-3 py-2 text-xs text-white
            opacity-0 transition-opacity
            group-hover:opacity-100 group-focus-within:opacity-100
          "
        >
          {tsStartFormatted} - {tsEndFormatted}
          <br />
            {alerts.map(alert => (
              <b key={alert.id}>{alert.effect}</b>
          ))}
        </div>
      </div>
    </>
  );
}