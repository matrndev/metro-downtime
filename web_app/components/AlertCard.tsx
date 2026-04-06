import { Alert } from "@/types/apiResponses"
import evalSeverity from "@/utils/evalSeverity"

export default function AlertCard({ alert }: { alert: Alert }) {
    return (
        <div className={`border rounded m-3 py-2 px-3 ${chooseBorderColor(alert)}`}>
            <p className="text-xl font-bold">{alert.headerText.translation[0].text}</p>
            <p className="text-sm text-gray-200 text-right">Line</p>
            <div id="description" className="max-h-20 overflow-scroll text-ellipsis">
                {
                    alert.descriptionText.translation[0].text ?
                    (<p className="text-md">{alert.descriptionText.translation[0].text}</p>) :
                    (<p className="text-sm italic text-gray-300">No description available.</p>)
                }
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
