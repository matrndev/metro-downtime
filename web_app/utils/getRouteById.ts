import { RouteInfo } from "@/types/apiResponses";

let routes: RouteInfo[] | null = null;
let routesPromise: Promise<RouteInfo[]> | null = null;

async function loadRoutes(): Promise<RouteInfo[]> {
    const res = await fetch("/api/all-routes");

    if (!res.ok) {
        return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? (data as RouteInfo[]) : [];
}

async function getAllRoutes(): Promise<RouteInfo[]> {
    if (routes) {
        return routes;
    }

    if (!routesPromise) {
        routesPromise = loadRoutes()
            .then((loadedRoutes) => {
                routes = loadedRoutes;
                return loadedRoutes;
            })
            .finally(() => {
                routesPromise = null;
            });
    }

    return routesPromise;
}

export default async function getRouteById(routeId: string) {
    const loadedRoutes = await getAllRoutes();
    return loadedRoutes.find((route) => route.route_id === routeId) ?? null;
}