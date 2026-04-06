import { Alert } from "@/types/apiResponses"
import evalSeverity from "@/utils/evalSeverity"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBus } from '@fortawesome/free-solid-svg-icons'

export default function AlertCard({ alert }: { alert: Alert }) {
  const maxRouteIdsToShow = 3;
  let routeIdsSliced = false;
  const allRouteIds = alert.informedEntity;
  let routeIds = alert.informedEntity;

  if (routeIds.length > maxRouteIdsToShow) {
    routeIds = routeIds.slice(0, maxRouteIdsToShow);
    routeIdsSliced = true;
  }

  return (
    <div className={`border rounded m-3 py-2 px-3 ${chooseBorderColor(alert)}`}>
      <div id="header" className="flex items-center justify-between gap-2">
        <p className="md:text-xl text-lg font-bold">{alert.headerText.translation[0].text}</p>
        <div className="text-lg text-gray-200">
          {
            routeIds.map((entity) =>
              <span className="mr-2 inline-flex whitespace-nowrap items-center" key={entity.routeId}>
                <FontAwesomeIcon key={entity.routeId} icon={faBus} className="mr-1" />
                <span>{entity.routeId}</span>
              </span>
            )
          }
          <span className="relative group flex-1">
            {routeIdsSliced && <span className="text-sm text-gray-300 underline decoration-dotted cursor-help">{`+ ${allRouteIds.length - maxRouteIdsToShow} more`}</span>}
            <div
              className="
                absolute right-0 top-full mt-2 max-w-96 pointer-events-none
                rounded-sm bg-stone-900 px-3 py-2 text-sm text-white border-stone-500 border
                opacity-0 transition-opacity z-50
                group-hover:opacity-100 group-focus-within:opacity-100
              "
            >
              {
                allRouteIds.slice(maxRouteIdsToShow, allRouteIds.length).map((entity) =>
                  <span className="mr-2 inline-flex whitespace-nowrap items-center" key={entity.routeId}>
                    <FontAwesomeIcon key={entity.routeId} icon={faBus} className="mr-1" />
                    <span>{entity.routeId}</span>
                  </span>
                )
              }
            </div>
          </span>
        </div>
      </div>
      <div id="description" className="max-h-20 overflow-scroll text-ellipsis">
        {
          alert.descriptionText.translation[0].text ?
            (<p className="text-md">{alert.descriptionText.translation[0].text}</p>) :
            (<p className="text-sm italic text-gray-300">No description available.</p>)
        }
      </div>
      <hr className="my-2 border-stone-500" />
      <div id="footer" className="text-xs text-gray-400">
        <span>Last updated:
          {" " + new Date(alert.lastUpdated * 1000).toLocaleDateString("en-GB", { hour: "2-digit", minute: "2-digit" })}
        </span>
        <span className="mx-1">·</span>
        <a className="text-blue-500 underline" href={alert.url.translation[0].text} target="_blank">
          View details
        </a>
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
