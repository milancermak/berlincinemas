# -*- coding: utf-8 -*-
from mongokit import *
from mongokit import Connection, Document
import api

@api.connection.register
class Cinema(Document):
    __collection__ = 'cinemas'
    __database__ = 'berlincinemas'
    structure = {
        'name': unicode,
        'll': unicode,
    }
    required_fields = ['name', 'll']
