from fastapi import FastAPI, HTTPException
import database
import downtime
import json

app = FastAPI()

POSSIBLE_EFFECTS = ["NO_SERVICE", "REDUCED_SERVICE", "SIGNIFICANT_DELAYS", "DETOUR", "ADDITIONAL_SERVICE", "MODIFIED_SERVICE", "OTHER_EFFECT", "UNKNOWN_EFFECT", "STOP_MOVED", "ACCESSIBILITY_ISSUE", "NO_EFFECT"]

@app.get("/alerts/all-active")
async def root():
    """
    gets all active alerts from database
    """
    data = database.get_active()
    return json.loads(json.dumps(data, default=str))

@app.get("/alerts/route/{route_id}")
async def get_alerts_for_route(route_id: str, last_days: int, filter_effects: str = None):
    """
    gets alerts for a specific route from database
    """
    picked_effects = filter_effects.split(",") if filter_effects else []
    important_only = False
    if picked_effects and picked_effects[0] == "_important":
        important_only = True
    else:
        for effect in picked_effects:
            if effect not in POSSIBLE_EFFECTS:
                raise HTTPException(status_code=400, detail=f"Invalid effect")
    
    data = database.get_alerts_for_route(route_id, last_days, important_only, filter_effects=picked_effects)
    return json.loads(json.dumps(data, default=str)) if data else {"detail": "No relevant results found"}

@app.get("/alerts/route/{route_id}/downtime")
async def get_downtime(route_id: str, last_days: int, filter_effects: str = None):
    picked_effects = filter_effects.split(",") if filter_effects else []
    important_only = False
    if picked_effects and picked_effects[0] == "_important":
        important_only = True
    else:
        for effect in picked_effects:
            if effect not in POSSIBLE_EFFECTS:
                raise HTTPException(status_code=400, detail=f"Invalid effect")

    data = downtime.downtime_for_route(route_id, downtime_window_days=last_days, important_only=important_only, filter_effects=picked_effects)
    return json.loads(json.dumps(data, default=str)) if data else {"detail": "No relevant results found"}
    