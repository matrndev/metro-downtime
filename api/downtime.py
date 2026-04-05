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

def downtime_for_route(route_id, downtime_window_days = 30, important_only = False, filter_effects = None):
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

def calculate_chunks(route_id, chunk_size_hours, chunk_count, important_only = False, filter_effects = None):
    now = datetime.now().timestamp()
    chunk_size_seconds = chunk_size_hours * 3600

    chunks = []
    for i in range(chunk_count):
        chunk_end = now - (i * chunk_size_seconds)
        chunk_start = now - ((i + 1) * chunk_size_seconds)
        chunks.append({
            "start": chunk_start,
            "end": chunk_end,
            "alertIds": []
        })
    
    range_start = chunks[-1]["start"]
    range_end = chunks[0]["end"]

    alerts = database.get_alerts_for_route_in_timeframe(
        route_id, range_start, range_end,
        important_only, filter_effects
    )
    
    for alert in alerts:
        period_start = alert["activePeriod"][0]["start"]
        period_end   = alert["activePeriod"][0]["end"] or range_end

        for i, chunk in enumerate(chunks):
            if period_start < chunk["end"] and period_end > chunk["start"]:
                chunks[i]["alertIds"].append(alert["id"])
    
    alerts_by_id = {
        alert["id"]: alert for alert in alerts
    }

    return chunks, alerts_by_id

    # now = datetime.now().timestamp()
    # chunk_size_seconds = chunk_size_hours * 3600

    # chunks = []
    # for i in range(chunk_count):
    #     chunk_end = now - (i * chunk_size_seconds)
    #     chunk_start = chunk_end - chunk_size_seconds
    #     chunks.append((chunk_start, chunk_end))

    # results = []
    # for start, end in chunks:
    #     downtime_info = downtime_for_route(route_id, downtime_window_days=chunk_size_hours/24, important_only=important_only, filter_effects=filter_effects)
    #     results.append({
    #         "start": start,
    #         "end": end,
    #         "downtime_info": {
    #             "downtime_pct": downtime_info["downtime_pct"],
    #             "incident_count": downtime_info["incident_count"]
    #         }
    #     })

    # # todo: this does not work how i want it to, it's probably still best to just make a db method where you can specify a time window and get the alerts for that ://////////

    # return results