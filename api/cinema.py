# -*- coding: utf-8 -*-
import pymongo


class Cinema(self):
""" Operations with cinemas.

"""

	def __init__(self):
	""" Move db connection to another place!
	    And make it singleton...

	"""
		try:
			# TODO configure DB settings
    		self.conn=pymongo.MongoClient()
    		self.db=self.conn['berlincinemas']
    		self.collection=db.berlincinemas_collection
		except pymongo.errors.ConnectionFailure, e:
   			# TODO Log OR throw error to be handled at upper layer
   			pass


	def get(cinema_id):
	""" Gets a cinema by id.

	"""
		return self.collection.find({"cinema_id": cinema_id })

	def list():
	""" Lists all the cinemas.

	"""
		result = []
		cursor=self.collection.find()
		for t in cursor.next():
			result.append(t)
		return result

	def find_by_latitude_longitude(latitude, longitude):
	""" Finds cinemas in a radius with center latitude, longitude
		TBD check http://docs.mongodb.org/manual/applications/geospatial-indexes/

	"""
		result = []
		cursor=self.collection.find({'latitude':latitude, 'longitde':longitude})
		for t in cursor.next():
			result.append(t)
		return result
		
