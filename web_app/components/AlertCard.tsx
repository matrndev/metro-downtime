"use client"

import { Alert } from "@/types/apiResponses"
import evalSeverity from "@/utils/evalSeverity"
import RouteShortName from "./RouteShortName"
import gtfsToHumanReadable from "@/utils/gtfsToHumanReadable"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

export default function AlertCard({ alert, showDetailsLink = true, changeOpacity = true }: { alert: Alert, showDetailsLink?: boolean, changeOpacity?: boolean }) {
  const maxRouteIdsToShow = 3;
  let routeIdsSliced = false;
  const allRouteIds = alert.informedEntity;
  let routeIds = alert.informedEntity;

  if (routeIds.length > maxRouteIdsToShow) {
    routeIds = routeIds.slice(0, maxRouteIdsToShow);
    routeIdsSliced = true;
  }

  const startFormatted = new Date(alert.activePeriod[0].start * 1000).toLocaleDateString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const endFormatted = alert.activePeriod[0]?.end ? new Date(alert.activePeriod[0].end * 1000).toLocaleDateString("en-GB", { hour: "2-digit", minute: "2-digit" }) : undefined;
  const now = new Date().getTime();
  let ended = false;
  if (alert.activePeriod[0].end && alert.activePeriod[0].end * 1000 < now) ended = true;

  return (
    <div className={`border rounded m-3 py-2 px-3 ${chooseBorderColor(alert)} ${ended && changeOpacity ? "opacity-50" : ""}`}>
      <div id="header" className="flex items-center justify-between gap-2">
        <h1 className="md:text-xl text-lg font-bold">{gtfsToHumanReadable(alert.effect, "en")} ({gtfsToHumanReadable(alert.cause, "en")})</h1>
        <div className="text-lg">
          {
            routeIds.map((entity) =>
              <span className="mr-2 inline-flex whitespace-nowrap items-center" key={entity.routeId}>
                <RouteShortName routeId={entity.routeId} />
              </span>
            )
          }
          <span className="relative group flex-1 text-nowrap">
            {routeIdsSliced && <span className="text-sm text-gray-300 underline decoration-dotted cursor-help">{`+ ${allRouteIds.length - maxRouteIdsToShow} more`}</span>}
            <div
              className="
                absolute right-0 top-full mt-2 max-w-96 pointer-events-none
                rounded-sm bg-stone-900 px-3 py-2 text-sm text-white border-stone-500 border
                opacity-0 transition-opacity z-50
                group-hover:opacity-100 group-focus-within:opacity-100 text-wrap
              "
            >
              {
                allRouteIds.slice(maxRouteIdsToShow, allRouteIds.length).map((entity) =>
                  <span className="mr-2 inline-flex whitespace-nowrap items-center" key={entity.routeId}>
                    <RouteShortName routeId={entity.routeId} />
                  </span>
                )
              }
            </div>
          </span>
        </div>
      </div>
      <h2 className="md:text-md text-sm font-thin text-stone-200">{startFormatted} — {endFormatted || <span className="text-red-500 underline decoration-2">ongoing</span>}</h2>
      <hr className="my-2 border-stone-500" />
      <div id="description" className="max-h-30 overflow-y-scroll"> {/* todo: the scrollbar looks a bit weird on chrome */ }
        {
          alert.descriptionText.translation[0].text ?
            (
              <>
                <p className="text-md font-bold">{alert.headerText.translation[0].text}</p>
                <p className="text-md">{alert.descriptionText.translation[0].text}</p>
              </>
            ) :
            (<>
              <p className="text-sm italic text-gray-300">No additional description available. <a href="/info/no-description" className="cursor-help"><FontAwesomeIcon icon={faCircleQuestion} /></a></p>
            </>)
        }
      </div>
      <hr className="my-2 border-stone-500" />
      <div id="footer" className="text-xs text-stone-400">
        <span>Last updated:
          {" " + new Date(alert.lastUpdated * 1000).toLocaleDateString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          {alert.wasOrphaned && " (o)"}
        </span>
        {showDetailsLink && !ended && (
          <>
            <span className="mx-1">·</span>
            <a className="text-blue-500 underline" href={alert.url.translation[0].text} target="_blank">
              View details <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </>
        )}
      </div>
    </div>
  )
}

function chooseBorderColor(alert: Alert) {
  let chosenColor = "border-green-500";

  const severity = evalSeverity(alert.effect);
  if (severity === 3) return "border-red-500";
  if (severity !== 0) return chosenColor = "border-yellow-500";
  return chosenColor;
}
