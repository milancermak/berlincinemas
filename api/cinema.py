# -*- coding: utf-8 -*-
from mongokit import *
from manage import connection

class Cinema(Document):
    structure = {
        'name': unicode,
        'll': unicode,
    }
    required_fields = ['name', 'll']

    def get(self,cinema_id):
		""" Gets a cinema by id.

		"""
		pass

connection.register([Cinema])