# -*- coding: utf-8 -*-

from flask import Flask


app = Flask("API")
app.config.from_object("config")

# TODO: make the API Hypermedia compliant and discoverable

from handlers import *
