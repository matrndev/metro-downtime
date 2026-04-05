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
  url: {
    translation: {
      text: string;
    }[];
  };
}

import gtfsToHumanReadable from "@/utils/gtfsToHumanReadable";
import evalSeverity from "@/utils/evalSeverity";

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
            "block h-8 text-sm " + chooseSegmentColor(alerts)
          }
        />

        <div
          className="
            absolute left-1/2 top-full mt-2 w-max max-w-xs pointer-events-none
            -translate-x-1/2 rounded-sm bg-gray-700 px-3 py-2 text-sm text-white
            opacity-0 transition-opacity text-center z-50
            group-hover:opacity-100 group-focus-within:opacity-100
          "
        >
          {tsStartFormatted} — {tsEndFormatted}
          <br />
            {alerts.map(alert => (
              <span key={alert.id}>
                <hr className="my-1" style={{ color: "#808080" }} />
                <b>{gtfsToHumanReadable(alert.effect, "en")}</b>
                <br />
                <p className="text-xs">{gtfsToHumanReadable(alert.cause, "en")}</p>
              </span>
          ))}
        </div>
      </div>
    </>
  );
}

function chooseSegmentColor(alerts: Array<Alert>) {
  let chosenColor = "bg-green-500";

  for (const alert of alerts) {
    const severity = evalSeverity(alert.effect);

    if (severity === 3) return "bg-red-500";
    if (severity !== 0) return chosenColor = "bg-yellow-500";
  }
  return chosenColor;
}

