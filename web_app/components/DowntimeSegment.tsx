"use client";

interface Alert {
  id: string;
  cause: string;
  effect: string;
  descriptionText: {
    translation: {
      text: string;
    }[];
  };s
}

export default function DowntimeSegment({ alerts, tsStart, tsEnd }: { alerts: Array<Alert>, tsStart: number, tsEnd: number }) {
  const tsStartDate = new Date(Number(tsStart) * 1000);
  const tsEndDate = new Date(Number(tsEnd) * 1000);
  const tsStartFormatted = tsStartDate.toLocaleDateString("en-GB", { hour: '2-digit', minute: '2-digit' });
  const tsEndFormatted = tsEndDate.toLocaleDateString("en-GB", { hour: '2-digit', minute: '2-digit' });

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
            -translate-x-1/2 rounded-sm bg-gray-700 px-3 py-2 text-sm text-white
            opacity-0 transition-opacity
            group-hover:opacity-100 group-focus-within:opacity-100
          "
        >
          {tsStartFormatted} -- {tsEndFormatted}
          <br />
            {alerts.map(alert => (
              <b key={alert.id}>{alert.effect}</b>
          ))}
        </div>
      </div>
    </>
  );
}