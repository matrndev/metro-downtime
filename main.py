import os
from dotenv import load_dotenv
load_dotenv()

import alerts
import database

current_alerts = alerts.get_current()

for entity in current_alerts:
    database.upsert_alert(entity)


#print(current_alerts[0].alert.active_period[0].end)
#print(alerts.calculate_active(current_alerts[0].alert.active_period[0].start, current_alerts[0].alert.active_period[0].end))


#print(database.get_active())

