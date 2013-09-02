# -*- encoding: utf-8 -*-

import times

def datetime_to_rfc3339(dt, tz="Europe/Berlin"):
    return times.format(dt, tz, "%Y-%m-%dT%H:%M:%S%z")
