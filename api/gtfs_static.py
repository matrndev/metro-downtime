import partridge as prg

path = "gtfs_examples/PID_GTFS.zip"
feed = prg.load_feed(path)


def get_route_by_id(route_id):
    route = feed.routes[feed.routes.route_id == route_id].to_dict(orient="records")[0]
    if not route:
        return None

    routeToSend = { 
        "route_id": str(route["route_id"]),
        "agency_id": str(route["agency_id"]),
        "route_short_name": str(route["route_short_name"]),
        "route_long_name": str(route["route_long_name"]),
        "route_type": int(route["route_type"]),
        "route_url": str(route["route_url"]),
        "route_color": str(route["route_color"]),
        "route_text_color": str(route["route_text_color"]),
        "is_night": bool(int(route["is_night"])),
        "is_regional": bool(int(route["is_regional"])),
        "is_substitute_transport": bool(int(route["is_substitute_transport"])),
    }
    return routeToSend


def get_routes():
    routes = feed.routes.to_dict(orient="records")
    routesToSend = []
    for route in routes:
        routesToSend.append(
            {
                "route_id": str(route["route_id"]),
                "agency_id": str(route["agency_id"]),
                "route_short_name": str(route["route_short_name"]),
                "route_long_name": str(route["route_long_name"]),
                "route_type": int(route["route_type"]),
                "route_url": str(route["route_url"]),
                "route_color": str(route["route_color"]),
                "route_text_color": str(route["route_text_color"]),
                "is_night": bool(int(route["is_night"])),
                "is_regional": bool(int(route["is_regional"])),
                "is_substitute_transport": bool(int(route["is_substitute_transport"])),
            }
        )
    return routesToSend
