"use client";

import { useEffect, useState } from "react";
import getRouteById from "@/utils/getRouteById";
import { chooseIconByRouteType } from "@/utils/chooseIconByRouteType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { RouteInfo } from "@/types/apiResponses";

function isRouteInfo(value: unknown): value is RouteInfo {
    if (!value || typeof value !== "object") {
        return false;
    }

    return "route_short_name" in value && "route_type" in value;
}

export default function RouteShortName({ routeId }: { routeId: string }) {
    const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadRouteInfo() {
            try {
                const data = await getRouteById(routeId);
                if (!isMounted) {
                    return;
                }

                setRouteInfo(isRouteInfo(data) ? data : null);
            } catch {
                if (!isMounted) {
                    return;
                }

                setRouteInfo(null);
            }
        }

        loadRouteInfo();

        return () => {
            isMounted = false;
        };
    }, [routeId]);

    const shortName = routeInfo?.route_short_name || routeId;
    const icon = routeInfo ? chooseIconByRouteType(routeInfo.route_type) : faQuestion;

    return (
        <a href={`/route/${routeId}`} target="_blank">
            <FontAwesomeIcon icon={icon} className="mr-1" />
            <span>{shortName}</span>
        </a>
    );
}