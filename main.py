import pymongo
from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()

import alerts

current_alerts = alerts.get_current_alerts()
print(current_alerts)

