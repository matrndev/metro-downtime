import partridge as prg

path = "gtfs_examples/PID_GTFS.zip"
feed = prg.load_feed(path)

def get_route_by_id(route_id):
    route = feed.routes[feed.routes.route_id == route_id].to_dict(orient="records")[0]
    if not route:
        return None

    routeToSend = {
        "route_id": route["route_id"],
        "agency_id": route["agency_id"],
        "route_short_name": route["route_short_name"],
        "route_long_name": route["route_long_name"],
        "route_type": route["route_type"],
        "route_url": route["route_url"],
        "route_color": route["route_color"],
        "route_text_color": route["route_text_color"],
        "is_night": int(route["is_night"]) == 1,
        "is_regional": int(route["is_regional"]) == 1,
        "is_substitute_transport": int(route["is_substitute_transport"]) == 1
    }
    return routeToSend