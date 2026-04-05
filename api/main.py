import os
from dotenv import load_dotenv
load_dotenv()

import alerts
import database

current_alerts = alerts.get_current()

print("Current alerts:")
for entity in current_alerts:
    database.upsert_alert(entity)
    print(entity)

print("\n\n\nAlerts updated successfully")
