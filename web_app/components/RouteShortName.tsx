import getRouteById from "@/utils/getRouteById"
import { chooseIconByRouteType } from "@/utils/chooseIconByRouteType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default async function RouteShortName({ routeId }: { routeId: string }) {
    const routeInfo = await getRouteById(routeId)
    
    return (
        <a href={`https://mapa.pid.cz/?filter=${routeInfo.route_short_name}`} target="_blank">
            <FontAwesomeIcon icon={chooseIconByRouteType(routeInfo.route_type)} className="mr-1" />
            <span>{routeInfo.route_short_name}</span>
        </a>
    )
}