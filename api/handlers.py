# -*- coding: utf-8 -*-

import json
import locale
import operator
import os
import sys
# fucking (relative) imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from flask import Flask
from flask import make_response
app = Flask(__name__)

@app.route("/cinemas/berlin/")
def berlin():
    import cinema
    response = make_response(json.dumps(cinema.list()))
    response.headers["Content-Type"] = "application/json"
    return response

@app.route("/latitude/<float:latitude>/longitude/<float:longitude>")
def near_cinema(latitude,longitude):
    response = make_response( \
        json.dumps(cinema.find_by_latitude_longitude(latitude, longitude)))
    response.headers["Content-Type"] = "application/json"
    return response

@app.route("/cinemas/<cinema_id>")
def get_cinema(cinema_id):
    response = make_response(json.dumps(cinema.get(cinema_id)))
    response.headers["Content-Type"] = "application/json"
    return response
