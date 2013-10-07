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

@app.route("/movies/")
def berlin():
    import api
    data = []
    result = {}
    movies = api.connection.berlincinemas.movies.find()
    for showtimes in movies:
        showtimes.pop('_id')
        data.append(showtimes)
    result['movies'] = data
    response = make_response(json.dumps(result))
    response.headers["Content-Type"] = "application/json"
    return response

@app.route("/cinemas/")
def get_cinema():
    import api
    data = []
    result = {}
    cinemas = api.connection.berlincinemas.cinemas.find()
    for kino in cinemas:
        kino.pop('_id')
        data.append(kino)
    result['cinemas'] = data
    response = make_response(json.dumps(result))
    response.headers["Content-Type"] = "application/json"
    return response
