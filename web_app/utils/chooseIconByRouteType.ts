import { faTrainTram, faSubway, faTrain, faBus, faFerry, faCableCar, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { RouteType } from '@/types/apiResponses'

export function chooseIconByRouteType(routeType: RouteType) {
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