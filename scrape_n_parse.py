# -*- coding: utf-8 -*-

import datetime
import itertools
import urllib
import json
import locale

from lxml import etree
import requests

from pymongo import MongoClient

BASE_URL = "http://www.berlin.de/kino/_bin/trefferliste.php"
START = 0
STOP = 4200
STEP = 300

def pairwise(iterable):
    return itertools.izip(*[iter(iterable)]*2)

def split_on(list, predicate):
    if len(list) < 0:
        return []

    result = []
    try:
        partial = [list[0]]
        for element in list[1:]:
            if predicate(element):
                result.append(partial)
                partial = [element]
            else:
                partial.append(element)
    except IndexError:
        # TODO implement a logger for the parser.
        pass
    return result

def scrape():
    for startat in xrange(START, STOP+STEP, STEP):
        params = {"startat": startat}
        url = BASE_URL + "?" + urllib.urlencode(params)
        response = requests.get(url)
        # print "@ %d" % startat
        yield response.text

def parse(html_data):
    def is_h2(element):
        return element.tag == "h2"

    cinema_showtimes = []
    tree = etree.HTML(html_data)
    results = tree.xpath("//div[@class='searchresult']")[0]
    results = filter(lambda element: element.tag != etree.Comment, results) # filter out the comment tags
    for cinema_group in split_on(results, is_h2):
        cinema_name = get_cinema_name(cinema_group)
        cinema_showtimes += get_shows(cinema_group, cinema_name)
    yield cinema_showtimes

def get_cinema_name(cinema_group):
    cinema_h2_tag = cinema_group[0]
    return cinema_h2_tag[0].text

def get_shows(cinema_group, cinema_name):
    showtimes = []

    # skip the first element as it's the h2 tag
    for movie_name_tag, movie_times_group in pairwise(cinema_group[1:]):
        movie_name = movie_name_tag[0].text
        movie_times = get_showtimes(movie_times_group.xpath(".//table")[0],cinema_name)
        for movie_time in movie_times:
            showtimes.append([{"title": movie_name},
                              {"$push": {"screenings": movie_time}}])
    return showtimes

def get_showtimes(showtime_table, cinema_name):
    showtimes = []
    for row in showtime_table.xpath(".//tr"):
        date_str = row.xpath(".//*[@class='datum']")[0].text # e.g. "Fr, 10.9.13"
        times_str = row.xpath(".//*[@class='uhrzeit']")[0].text # e.g. "20:00, 22:30"

        date_str_sanitized = date_str.strip().split()[1]
        day, month, year = map(int, date_str_sanitized.split("."))
        for a_time in times_str.split(", "):
            hour, minute = map(int, a_time.split(":"))
            showtimes.append({"date": datetime.datetime(year=year+2000, month=month, day=day,
                                                        hour=hour, minute=minute, second=0).isoformat("T"),
                              "cinema": cinema_name})

    return showtimes

def main():
    client = MongoClient('localhost', 27017)
    db = client.berlincinemas
    movies = db.movies
    movies.drop()

    for html_data in scrape():
        for shows in parse(html_data):
            for show in shows:
                movies.update(show[0], show[1], True)

if __name__ == "__main__":
    locale.setlocale(locale.LC_ALL, "de_DE.UTF-8")
    main()
