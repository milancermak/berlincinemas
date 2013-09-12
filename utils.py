# -*- encoding: utf-8 -*-

import datetime

import times

RFC3339_FMT = "%Y-%m-%dT%H:%M:%S%z"

def datetime_to_rfc3339(dt, tz="Europe/Berlin"):
    return times.format(dt, tz, RFC3339_FMT)

def rfc3339_to_datetime(rfc_string):
    return times.to_universal(rfc_string) # time in UTC

def only_active_shows(all_shows):
    day_format = "%Y-%m-%d"
    today = times.now().strftime(day_format)

    def is_active(show):
        show_datetime = rfc3339_to_datetime(show["screening_time"])
        show_day = show_datetime.strftime(day_format)
        # allow today's screenings, even if hour is past
        return show_day >= today

    return filter(is_active, all_shows)
