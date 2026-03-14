import pymongo
from pymongo import MongoClient
import os
import json
import datetime
from dotenv import load_dotenv
from google.protobuf.json_format import MessageToDict
load_dotenv()

import alerts

client = MongoClient(os.getenv("MONGODB_URI"))
db = client["metro-downtime"]
collection = db["alerts"]

IMPORTANT_EFFECTS = ["NO_SERVICE", "REDUCED_SERVICE", "SIGNIFICANT_DELAYS"]

def upsert_alert(entity):
    """
    inserts or updates an alert in the database
    """
    new_alert = MessageToDict(entity)

    alert_data = new_alert.pop("alert", {}) # un-nest alert
    new_alert.update(alert_data)
    new_alert.update({"active": alerts.calculate_active(entity.alert.active_period[0].start, entity.alert.active_period[0].end)}) # add active boolean for easier checking
    new_alert.update({"activePeriod": [{"start": entity.alert.active_period[0].start, "end": entity.alert.active_period[0].end}]}) # convert epochs to int

    collection.update_one({"id": new_alert["id"]}, {"$set": new_alert}, upsert=True)

def get_alerts_for_route(route_id, last_days = 1, important_only = False):
    """
    retrieves alerts for the specified route
    *note: last_days set to 1 (default) returns alerts that started today at 00:00 onwards*
    """
    current_ts = datetime.datetime.now().timestamp()
    window_start_ts = current_ts - (last_days * 86400)
    
    route_alerts = collection.find({
        "informedEntity": {"$elemMatch": {"routeId": route_id}},
        **({"effect": {"$in": IMPORTANT_EFFECTS}} if important_only else {}),
        "activePeriod.0.start": {"$lt": current_ts},
        "$or": [
            {"activePeriod.0.end": {"$exists": False}},  # no end field
            {"activePeriod.0.end": 0},                   # open-ended
            {"activePeriod.0.end": {"$gt": window_start_ts}},  # ended inside/after window
        ],
    })

    return list(route_alerts)

def get_active():
    active_alerts = collection.find({"active": True})
    return list(active_alerts)