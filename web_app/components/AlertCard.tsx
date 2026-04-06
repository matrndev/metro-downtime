import { Alert } from "@/types/apiResponses"
import evalSeverity from "@/utils/evalSeverity"

export default function AlertCard({ alert }: { alert: Alert }) {
    return (
        <div className={`border rounded m-3 py-2 px-3 ${chooseBorderColor(alert)}`}>
            <div id="header" className="flex items-center justify-between gap-2">
                <p className="md:text-xl text-lg font-bold">{alert.headerText.translation[0].text}</p> {/* todo: add icon */}
                <p className="text-lg text-gray-200">{alert.informedEntity.map((entity) => ":) " + entity.routeId).join(", ")}</p>
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
