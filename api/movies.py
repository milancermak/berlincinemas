# -*- coding: utf-8 -*-
from mongokit import *
from mongokit import Connection, Document
import api

@api.connection.register
class Movie(Document):
    __collection__ = 'movies'
    __database__ = 'berlincinemas'
    structure = {
        'title': unicode,
        'screenings': [ {'date': datetime.datetime,
                        'cinema': unicode}]
    }
    required_fields = ['name', 'll']
