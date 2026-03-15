# line A: L991
# line B: L992
# line C: L993
# todo: make this app work for all lines?

import database

from datetime import datetime
import database

def merge_intervals(intervals):
    if not intervals:
        return []
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for s, e in intervals[1:]:
        last_s, last_e = merged[-1]
        if s <= last_e:
            merged[-1] = (last_s, max(last_e, e))
        else:
            merged.append((s, e))
    return merged

def downtime_for_route(route_id, downtime_window_days = 30, important_only = True, filter_effects = None):
    """
    returns json with calculated downtime for the selected route
    """
    now = datetime.now().timestamp()

    alerts = database.get_alerts_for_route(route_id, downtime_window_days, important_only=important_only, filter_effects=filter_effects)

    window_start = now - downtime_window_days * 86400

    intervals = []

    for a in alerts:
        period = (a.get("activePeriod") or [{}])[0]
        start = period.get("start")
        end = period.get("end", 0)

        if start is None:
            continue

        # if end is missing/0 treat as still active
        end = now if not end else min(end, now)

        if end > window_start and start < now:
            intervals.append((max(start, window_start), end))

    merged = merge_intervals(intervals)
    total_seconds = int(sum(e - s for s, e in merged))
    window_seconds = downtime_window_days * 86400

    results = {
        "downtime_seconds": total_seconds,
        "downtime_hours": round(total_seconds / 3600, 2),
        "downtime_pct": round((total_seconds / window_seconds) * 100, 2),
        "incident_count": len(merged)
    }

    return results