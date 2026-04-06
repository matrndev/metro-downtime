from google.transit import gtfs_realtime_pb2
import requests
import os
import time
from dotenv import load_dotenv
from google.protobuf.json_format import MessageToJson
load_dotenv()

FEED_URL = os.getenv("GTFS_FEED_URL") + "trip_updates.pb"

def get_current():
    feed = gtfs_realtime_pb2.FeedMessage()
    response = requests.get(FEED_URL)
    feed.ParseFromString(response.content)

    return feed

def save_current_json(path="trip_updates.json"):
    feed = get_current()
    with open(path, "w", encoding="utf-8") as f:
        f.write(MessageToJson(feed))
    return path

save_current_json()

