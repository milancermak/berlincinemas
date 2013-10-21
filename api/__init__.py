# -*- coding: utf-8 -*-

from flask import Flask
from mongokit import Connection
from os import path
from inspect import getfile, currentframe

app = Flask("API")
#app.config.from_object("config")

import configparser

# TODO handle errors!
config = configparser.ConfigParser()
config.read(path.join(path.dirname(path.abspath(getfile(currentframe()))), '../config.py'))

connection = Connection( config['DATABASE']['MONGODB_HOST'], int(config['DATABASE']['MONGODB_PORT']) )

# After db connection and flask config, flask.routes enabled.
from handlers import *