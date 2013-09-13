# -*- coding: utf-8 -*-

import json
import locale
import operator
import os
import sys
# fucking (relative) imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from flask import Flask
app = Flask(__name__)

import cinemas
import utils


__all__ = ["berlin"]


@app.route("/cinemas/berlin/")
def berlin():
    berlin = []
    for cinema_cls in cinemas.known_cinemas():
        cinema = cinema_cls()
        cinema_data = cinema.as_dict()
        cinema_data["shows"].sort(cmp=operator.le, key=lambda show: show["screening_time"])
        berlin.append(cinema_data)
    berlin.sort(cmp=locale.strcoll, key=lambda cinema: cinema["name"])
    response = flask.make_response(json.dumps(berlin))
    response.headers["Content-Type"] = "application/json"
    return response
