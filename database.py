import pymongo
from pymongo import MongoClient
import os
import json
from dotenv import load_dotenv
from google.protobuf.json_format import MessageToDict
load_dotenv()

import alerts

client = MongoClient(os.getenv("MONGODB_URI"))
db = client["metro-downtime"]
collection = db["alerts"]

def upsert_alert(entity):
    new_alert = MessageToDict(entity)

    alert_data = new_alert.pop("alert", {}) # un-nest alert
    new_alert.update(alert_data)
    new_alert.update({"active": alerts.calculate_active(entity.alert.active_period[0].start, entity.alert.active_period[0].end)})

    collection.update_one({"id": new_alert["id"]}, {"$set": new_alert}, upsert=True)

def get_active():
    active_alerts = collection.find({"active": True})
    return list(active_alerts)