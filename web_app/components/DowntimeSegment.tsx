"use client";

import { useState } from "react";
import gtfsToHumanReadable from "@/utils/gtfsToHumanReadable";
import evalSeverity from "@/utils/evalSeverity";
import { Alert } from "@/types/apiResponses";
import AlertCard from "./AlertCard";
import RouteShortName from "./RouteShortName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function DowntimeSegment({ alerts, tsStart, tsEnd, route }: { alerts: Array<Alert>, tsStart: number, tsEnd: number, route: string }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const tsStartDate = new Date(Number(tsStart) * 1000);
  const tsEndDate = new Date(Number(tsEnd) * 1000);
  const tsStartFormatted = tsStartDate.toLocaleDateString("en-GB", { hour: '2-digit', minute: '2-digit' });
  const tsEndFormatted = tsEndDate.toLocaleDateString("en-GB", { hour: '2-digit', minute: '2-digit' });
  const language = "en";

  function openPopup() {
    setIsPopupOpen(true);
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  return (
    <>
      <div className="relative group flex-1">
        <button
          type="button"
          onClick={openPopup}
          className={
            "w-full hover:border-2 border-blue-400 rounded block h-8 text-sm " + chooseSegmentColor(alerts)
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

      {isPopupOpen && (
        
          <div
            className="fixed inset-0 z-70 flex items-center justify-center bg-black/70 px-3"
            onClick={closePopup}
          >
            <div
              className="w-full max-w-4xl rounded-md border border-stone-700 bg-stone-950"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-2 border-b border-stone-700 px-4 py-3">
                <p className="text-sm text-stone-200">
                  <RouteShortName routeId={route} /> · {tsStartFormatted} — {tsEndFormatted}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="rounded border border-red-500/0 px-1.5 py-1 text-md text-stone-200 hover:border-red-500 transition"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              </div>

              {alerts.length > 0 ? (
                <div className="max-h-[67vh] overflow-y-scroll">
                  {alerts.map((alert) => (
                    <AlertCard key={alert.id} alert={alert} changeOpacity={false} />
                  ))}
                </div>
              ) : (
                <p className="px-4 py-6 text-sm text-stone-300">No alerts found for this segment.</p>
              )}
            </div>
          </div>
        
      )}
    </>
  );
}

function chooseSegmentColor(alerts: Array<Alert>) {
  let chosenColor = "bg-green-600";

  for (const alert of alerts) {
    const severity = evalSeverity(alert.effect);

    if (severity !== 0) chosenColor = "bg-yellow-600";
    if (severity === 3) return chosenColor = "bg-red-600";
  }
  return chosenColor;
}

