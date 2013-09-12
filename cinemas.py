# -*- coding: utf-8 -*-

# TODO: add fake User-Agent header, rotate values randomly
#       make the parsing more resilient
#       alternatively get program from http://www.berlin.de/kino/_bin/azkino.php

import abc
import datetime
import inspect
import sys

from lxml import etree
import requests

import db
import utils


class Cinema(object):
    __metaclass__ = abc.ABCMeta

    COORDS = (None, None) # latitude, longitude
    PROGRAM_URL = None

    def __init__(self):
        assert(self.COORDS[0] and self.COORDS[1])
        assert(self.PROGRAM_URL)

        self.rdop = db.RedisOperator()
        self.name = self.__class__.__name__
        cinema_dict = self.rdop.get_cinema(self.name)
        self.shows = utils.only_active_shows(cinema_dict["shows"])
        self.raw_html = None

    def as_dict(self):
        return {"latitude": self.COORDS[0],
                "longitude": self.COORDS[1],
                "name": self.name,
                "shows": self.shows}

    def fetch_latest(self):
        self.scrape()
        self.parse()
        self.save()

    def parse(self):
        raise NotImplementedError

    def scrape(self):
        self.raw_html = requests.get(self.PROGRAM_URL).text

    def save(self):
        self.rdop.store_cinema(self.as_dict())


class Acud(Cinema):

    COORDS = (52.53353000000002, 13.400859999999971)
    PROGRAM_URL = "http://www.acud.de/kino_programm.php5"

    def parse(self):
        tree = etree.HTML(self.raw_html)
        events_table = tree.xpath("//table[@class='positionevent']")[0]
        # select the relevant <tr>s
        event_rows = events_table.xpath(".//tr/td[@class='subueberschrift']/..")
        now = datetime.datetime.now()
        date = datetime.datetime.now().strftime("%d.%m")

        for row in event_rows:
            tds = row.xpath(".//td")
            if tds[0].text:
                date = tds[0].text.split()[1].strip(".") # %d.%m
            time = tds[2].text.split()[0] # %H:%M
            dt = datetime.datetime.strptime(".".join([date, str(now.year), time]),
                                            "%d.%m.%Y.%H:%M") # TODO: this will not be correct when the year changes
            title = tds[4].xpath(".//a")[0].text.strip()
            model = {"title": title,
                     "screening_time": utils.datetime_to_rfc3339(dt)}
            self.shows.append(model)

    def scrape(self):
        html = requests.get(self.PROGRAM_URL).text
        # skip the <?xml... declaration on first line because lxml doesn't play nice
        first_newline = html.find("\n")
        self.raw_html = html[first_newline+1:]


class Hasenheide(Cinema):

    COORDS = (52.4841131, 13.416982499999996)
    PROGRAM_URL = "http://www.freiluftkino-hasenheide.de/new/index.php/unser-programm"

    def parse(self):
        tree = etree.HTML(self.raw_html)
        events = tree.xpath("//*[@class='event']")

        for event in events:
            title = event.xpath(".//h1//a")[0].text
            date = event.xpath(".//*[@class='nextdate']//b")[0].text # %d.%m.%Y
            time = event.xpath(".//*[@class='evttime']")[0].text.split()[0] # %H:%M
            # TODO: the timezone is incorrect by 2 hours

            dt = datetime.datetime.strptime(date+time, "%d.%m.%Y%H:%M")
            model = {"title": title.strip().capitalize(),
                     "screening_time": utils.datetime_to_rfc3339(dt)}
            self.shows.append(model)


class FreiluftFriedrichshein(Cinema):

    COORDS = (52.525347, 13.435439)
    PROGRAM_URL = "http://www.freiluftkino-berlin.de/eine_woche.php"

    def parse(self):
        tree = etree.HTML(self.raw_html)
        events = tree.xpath("//table[@class='teasertable']")

        for event in events:
            title = event.xpath(".//*[@class='teasertitel']")[0].text
            date_and_time = event.xpath(".//*[@class='teaserdatum']")[0].text
            _, date, time = map(lambda s: s.strip(), date_and_time.split(','))

            dt = datetime.datetime.strptime(date+time, "%d.%m.%Y%H:%M")
            model = {"title": title.strip(),
                     "screening_time": utils.datetime_to_rfc3339(dt)}
            self.shows.append(model)


def known_cinemas():
    cinema_objects = []
    module = sys.modules[__name__]
    for object_name in dir(module):
        obj = module.__getattribute__(object_name)
        if (inspect.isclass(obj) and
            issubclass(obj, Cinema) and
            obj is not Cinema):
            cinema_objects.append(obj)
    return cinema_objects
