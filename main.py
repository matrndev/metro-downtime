import os
from dotenv import load_dotenv
load_dotenv()

import alerts
import downtime
import database

current_alerts = alerts.get_current()

print("Current alerts:")
for entity in current_alerts:
    database.upsert_alert(entity)
    print(entity)

# route_id = input("Get route downtime for route: ")
# important_only_input = input("Important alerts only? (y/n): ")
# important_only = important_only_input.lower() == 'y'
# print(downtime.downtime_for_route(route_id, important_only=important_only))
