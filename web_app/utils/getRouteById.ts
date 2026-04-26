import { RouteInfo } from "@/types/apiResponses";

export default async function getRouteById(routeId: string) {
    const res = await fetch(`http://localhost:8000/info/route/${routeId}`);
    const data = await res.json();

    return data as RouteInfo;
}