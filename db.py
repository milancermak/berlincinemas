# -*- coding: utf-8 -*-

import collections
import json

import redis

from api import app


# TODO: the modeling right now is really fragile, rethink it

class RedisOperator(object):

    def __init__(self):
        self.redis = redis.Redis(host=app.config["REDIS_HOST"],
                                 port=app.config["REDIS_PORT"])

    def get_cinema(self, cinema_name):
        key = "cinema:" + cinema_name
        data = self.redis.get(key)
        if not data:
            return collections.defaultdict(list)
        return json.loads(data)

    def store_cinema(self, cinema_dict):
        key = "cinema:" + cinema_dict["name"]
        self.redis.set(key, json.dumps(cinema_dict))
