
from pymongo import MongoClient, database

db = MongoClient('localhost', 27017)['berlincinemas']
movies = db.movies.find({},{'_id':0,'cinema':1}).distinct('cinema')
cinemas = db.cinemas.find({},{'_id':0,'name':1}).distinct('name')

for name in movies:
    if name not in cinemas:
        print name
