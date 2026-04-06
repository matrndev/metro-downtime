export enum RouteType {
    Tram,
    Subway,
    Rail,
    Bus,
    Ferry,
    CableTram,
    AerialLift,
    Funicular,
    Trolleybus = 11,
    Monorail = 12
}

interface RouteInfo {
    route_id: string;
    agency_id: string;
    route_short_name: string;
    route_long_name: string;
    route_type: RouteType;
    route_url: string;
    route_color: string;
    route_text_color: string;
    is_night: boolean;
    is_regional: boolean;
    is_substitute_transport: boolean;
}

export default async function getRouteById(routeId: string) {
    const res = await fetch(`http://localhost:8000/info/route/${routeId}`);
    const data = await res.json();

    return data as RouteInfo;
}