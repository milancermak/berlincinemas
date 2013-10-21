# -*- coding: utf-8 -*-

from datetime import tzinfo, timedelta, datetime
import itertools
import urllib
import json
import locale

from lxml import etree
import requests

from pymongo import MongoClient

BASE_URL = "http://www.berlin.de/kino/_bin/trefferliste.php"
STEP = 300

# Berlin timezone GMT+2/+1
TZBERLINDSTON  = (2*60)
TZBERLINDSTOFF = (1*60)

# DST Starts 31 march 2013 2 am
DSTstarts = datetime(year=datetime.now().year, month=3, day=31, hour=2, minute=0, second=0)
# DST Ends   27 oct 2013 3 am
DSTends = datetime(year=datetime.now().year, month=10, day=27, hour=3, minute=0, second=0)

def pairwise(iterable):
    return itertools.izip(*[iter(iterable)]*2)

def split_on(results, predicate):
    if len(results) < 0:
        return []

    result = []

    partial = [results[0]]

    for element in results[1:]:
        if predicate(element):
            result.append(partial)
            partial = [element]
        else:
            partial.append(element)
    result.append(partial)
    return result

def scrape():
    def has_kino_comment(element):
        if element.tag is etree.Comment:
            return element.text == ' KINO '

    startat = 0
    while True:
        params = {"startat": startat}
        url = BASE_URL + "?" + urllib.urlencode(params)
        response = requests.get(url)

        tree = etree.HTML(response.text)
        results = tree.xpath("//div[@class='searchresult']")[0]

        startat += STEP
        if filter(has_kino_comment, results):
            yield response.text
        else:
            raise StopIteration

def parse(html_data):
    def is_h2(element):
        return element.tag == "h2"

    def is_not_comment(element):
        return element.tag is not etree.Comment

    cinema_showtimes = []
    tree = etree.HTML(html_data)
    results = tree.xpath("//div[@class='searchresult']")[0]

    results = filter(is_not_comment, results) # filter out the comment tags

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
            showtimes.append( dict({"title": movie_name}.items() +
                              movie_time.items()) )
    return showtimes

def get_showtimes(showtime_table, cinema_name):
    class TZ(tzinfo):
        def utcoffset(self, dt):
            now = datetime.now()
            if DSTstarts < now < DSTends :
                return timedelta(minutes=TZBERLINDSTON)
            else:
                return timedelta(minutes=TZBERLINDSTOFF)

    showtimes = []
    for row in showtime_table.xpath(".//tr"):
        date_str = row.xpath(".//*[@class='datum']")[0].text # e.g. "Fr, 10.9.13"
        times_str = row.xpath(".//*[@class='uhrzeit']")[0].text # e.g. "20:00, 22:30"

        date_str_sanitized = date_str.strip().split()[1]
        day, month, year = map(int, date_str_sanitized.split("."))
        for a_time in times_str.split(", "):
            hour, minute = map(int, a_time.split(":"))
            showtimes.append({"date": datetime(year=year+2000, month=month, day=day,
                                        hour=hour, minute=minute, second=0, tzinfo=TZ()).isoformat("T"),
                              "cinema": cinema_name})

    return showtimes

def main():
    movies_to_add = []
    for html_data in scrape():
        for shows in parse(html_data):
            for show in shows:
                movies_to_add.append(show)

    client = MongoClient('localhost', 27017)
    db = client.berlincinemas
    movies = db.movies
    movies.drop()

    for show in movies_to_add:
        movies.insert(show)

if __name__ == "__main__":
    locale.setlocale(locale.LC_ALL, "de_DE.UTF-8")
    main()
