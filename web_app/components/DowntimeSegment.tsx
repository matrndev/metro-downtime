"use client";

import gtfsToHumanReadable from "@/utils/gtfsToHumanReadable";
import evalSeverity from "@/utils/evalSeverity";
import { Alert } from "@/types/apiResponses";

export default function DowntimeSegment({ alerts, tsStart, tsEnd, route }: { alerts: Array<Alert>, tsStart: number, tsEnd: number, route: string }) {
  const tsStartDate = new Date(Number(tsStart) * 1000);
  const tsEndDate = new Date(Number(tsEnd) * 1000);
  const tsStartFormatted = tsStartDate.toLocaleDateString("en-GB", { hour: '2-digit', minute: '2-digit' });
  const tsEndFormatted = tsEndDate.toLocaleDateString("en-GB", { hour: '2-digit', minute: '2-digit' });
  const language = "cs";

  return (
    <>
      <div className="relative group flex-1">
        <a
          href={`/route/${route}?start=${tsStart}&end=${tsEnd}`}
          className={
            "hover:border-2 border-blue-400 rounded block h-8 text-sm " + chooseSegmentColor(alerts)
          }
        />

        <div
          className="
            absolute left-1/2 top-full mt-2 w-max max-w-xs pointer-events-none
            -translate-x-1/2 rounded-sm bg-stone-900 px-3 py-2 text-sm text-white border-stone-500 border
            opacity-0 transition-opacity text-center z-50 
            group-hover:opacity-100 group-focus-within:opacity-100
          "
        >
          {tsStartFormatted} — {tsEndFormatted}
          <br />
            {alerts.map(alert => (
              <span key={alert.id}>
                <hr className="my-1 border-stone-400" />
                <b>{gtfsToHumanReadable(alert.effect, language)}</b>
                <br />
                <p className="text-xs">{gtfsToHumanReadable(alert.cause, language)}</p>
              </span>
          ))}
        </div>
      </div>
    </>
  );
}

function chooseSegmentColor(alerts: Array<Alert>) {
  let chosenColor = "bg-green-600";

  for (const alert of alerts) {
    const severity = evalSeverity(alert.effect);

    if (severity === 3) return "bg-red-600";
    if (severity !== 0) return chosenColor = "bg-yellow-600";
  }
  return chosenColor;
}

