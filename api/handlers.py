# -*- coding: utf-8 -*-

import json
import locale
import operator
import os
import sys
# fucking (relative) imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import api

from flask import Flask
from flask import make_response
app = Flask(__name__)

def get_cinemas():
    data = []
    cinemas = api.connection.berlincinemas.cinemas.find()
    for kino in cinemas:
        kino.pop('_id')
        data.append(kino)
    return data

@app.route("/berlin/cinemas/")
def berlin_cinemas():
    data = []
    result = {}
    movies = api.connection.berlincinemas.movies.find()
    for showtimes in movies:
        showtimes.pop('_id')
        data.append(showtimes)
    result['movies'] = data
    result['cinemas'] = get_cinemas()

    response = make_response(json.dumps(result))
    response.headers["Content-Type"] = "application/json"
    return response

@app.route("/berlin/cinemas/today")
def berlin_cinemas_today():
    from datetime import datetime, timedelta
    import pytz

    rfc_3339_fmt = "%Y-%m-%dT%H:%M:%S%z"
    berlin_tz = pytz.timezone("Europe/Berlin")
    today = datetime.today().replace(hour=0,minute=0,second=0,microsecond=0)

    date_tz_start = berlin_tz.localize(today)
    date_tz_end = berlin_tz.localize(today+timedelta(days=1))

    data = []
    result = {}
    movies = api.connection.berlincinemas.movies.find({ 'date': \
        {'$gt':date_tz_start.strftime(rfc_3339_fmt), '$lt':date_tz_end.strftime(rfc_3339_fmt)}})
    for showtimes in movies:
        showtimes.pop('_id')
        data.append(showtimes)
    result['movies'] = data
    result['cinemas'] = get_cinemas()

    response = make_response(json.dumps(result))
    response.headers["Content-Type"] = "application/json"
    return response