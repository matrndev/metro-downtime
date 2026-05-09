from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import database
import downtime
import json
import gtfs_static

app = FastAPI()

# origins = [
#     "http://localhost",
#     "http://localhost:3000",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

POSSIBLE_EFFECTS = ["NO_SERVICE", "REDUCED_SERVICE", "SIGNIFICANT_DELAYS", "DETOUR", "ADDITIONAL_SERVICE", "MODIFIED_SERVICE", "OTHER_EFFECT", "UNKNOWN_EFFECT", "STOP_MOVED", "ACCESSIBILITY_ISSUE", "NO_EFFECT"]

@app.get("/")
async def root():
    return "hi!"

@app.get("/alerts/all-active")
async def root():
    data = database.get_active()
    return json.loads(json.dumps(data, default=str))

@app.get("/alerts/route/{route_id}")
async def get_alerts_for_route(route_id: str, last_days: float = None, filter_effects: str = None, start: float = None, end: float = None):
    picked_effects = filter_effects.split(",") if filter_effects else []
    important_only = False
    if picked_effects and picked_effects[0] == "_important":
        important_only = True
    else:
        for effect in picked_effects:
            if effect not in POSSIBLE_EFFECTS:
                raise HTTPException(status_code=400, detail=f"Invalid effect")
    
    data = database.get_alerts_for_route(route_id, last_days, important_only, filter_effects=picked_effects, timeframe_start=start, timeframe_end=end)
    return json.loads(json.dumps(data, default=str))

@app.get("/alerts/route/{route_id}/downtime")
async def get_downtime(route_id: str, last_days: float, filter_effects: str = None):
    picked_effects = filter_effects.split(",") if filter_effects else []
    important_only = False
    if picked_effects and picked_effects[0] == "_important":
        important_only = True
    else:
        for effect in picked_effects:
            if effect not in POSSIBLE_EFFECTS:
                raise HTTPException(status_code=400, detail=f"Invalid effect")

    data = downtime.downtime_for_route(route_id, downtime_window_days=last_days, important_only=important_only, filter_effects=picked_effects)
    return json.loads(json.dumps(data, default=str)) 

# todo: we should outsource picked effects checking to a different function since it's used in multiple places
@app.get("/alerts/route/{route_id}/downtime/chunks")
async def get_downtime_chunks(route_id: str, chunk_size_hours: float, chunk_count: int, filter_effects: str = None):
    #!return FileResponse("chunks_example.json")
    picked_effects = filter_effects.split(",") if filter_effects else []
    important_only = False
    if picked_effects and picked_effects[0] == "_important":
        important_only = True
    else:
        for effect in picked_effects:
            if effect not in POSSIBLE_EFFECTS:
                raise HTTPException(status_code=400, detail=f"Invalid effect")

    data = downtime.calculate_chunks(route_id, chunk_size_hours, chunk_count, important_only=important_only, filter_effects=picked_effects)
    if not data:
        return {}
    
    return {
        "chunks": json.loads(json.dumps(data[0], default=str)),
        "alerts": json.loads(json.dumps(data[1], default=str))
    }

@app.get("/info/route/{route_id}")
async def get_route_by_id(route_id: str):
    data = gtfs_static.get_route_by_id(route_id)
    return data 

@app.get("/info/all-routes")
async def get_routes():
    data = gtfs_static.get_routes()
    return data 