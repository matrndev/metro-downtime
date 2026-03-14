from google.transit import gtfs_realtime_pb2
import requests
import os
from dotenv import load_dotenv
load_dotenv()

FEED_URL = os.getenv("GTFS_FEED_URL")
WATCHED_ROUTES = ["L991", "L992", "L993", "L560"]
current_alerts = []

def get_current_alerts():
    feed = gtfs_realtime_pb2.FeedMessage()
    response = requests.get(FEED_URL)
    feed.ParseFromString(response.content)

    for entity in feed.entity:
        if not entity.HasField("alert"):
            continue

        for element in entity.alert.informed_entity:
            if element.route_id in WATCHED_ROUTES:
                current_alerts.append(entity)
    return current_alerts