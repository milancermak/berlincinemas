# -*- coding: utf-8 -*-

from flask import Flask
from mongokit import Connection

app = Flask("API")
#app.config.from_object("config")

import configparser

# TODO handle errors!
config = configparser.ConfigParser()
config.read( 'config.py' )
connection = Connection( config['DATABASE']['MONGODB_HOST'], int(config['DATABASE']['MONGODB_PORT']) )

# After db connection and flask config, flask.routes enabled.
from handlers import *