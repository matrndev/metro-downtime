import getRouteById from "@/utils/getRouteById"
import { RouteType } from "@/utils/getRouteById"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrainTram, faSubway, faTrain, faBus, faFerry, faCableCar, faQuestion } from '@fortawesome/free-solid-svg-icons'

export default async function RouteShortName({ routeId }: { routeId: string }) {
    const routeInfo = await getRouteById(routeId)
    
    return (
        <a href={`https://mapa.pid.cz/?filter=${routeInfo.route_short_name}`} target="_blank">
            <FontAwesomeIcon icon={chooseIcon(routeInfo.route_type)} className="mr-1" />
            <span>{routeInfo.route_short_name}</span>
        </a>
    )
}

function chooseIcon(routeType: RouteType) {
    switch (routeType) {
        case RouteType.Tram: return faTrainTram
        case RouteType.Subway: return faSubway
        case RouteType.Rail: return faTrain
        case RouteType.Bus: return faBus
        case RouteType.Ferry: return faFerry
        case RouteType.CableTram: return faCableCar
        case RouteType.AerialLift: return faCableCar
        case RouteType.Funicular: return faCableCar
        case RouteType.Trolleybus: return faBus
        case RouteType.Monorail: return faTrain
        default: return faQuestion
    }
}