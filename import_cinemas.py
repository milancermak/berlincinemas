# -*- coding: utf-8 -*-

from pymongo import MongoClient
import locale
import csv


CINEMA_FILE = './doc/ll.csv'

def read_file():
	with open(CINEMA_FILE, 'rb') as csvfile:
		cinemas = csv.reader(csvfile)
		for row in cinemas:
			yield row

def main():
    client = MongoClient('localhost', 27017)
    db = client.berlincinemas
    cinemas = db.cinemas
    cinemas.drop()
    firstline = True
    for cinema in read_file():
        if firstline:    #skip first line
            firstline = False
            continue
        cinemas.insert([{'name': cinema[0], 'll' : cinema[1] + ',' + cinema[2] }])

if __name__ == "__main__":
    locale.setlocale(locale.LC_ALL, "de_DE.UTF-8")
    main()
