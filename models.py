# -*- encoding: utf-8 -*-

# TODO: add fake User-Agent header, rotate values randomly

import abc
import datetime

from lxml import etree
import requests

import utils


class Cinema(object):
    __metaclass__ = abc.ABCMeta

    COORDS = (None, None) # latitude, longitude
    PROGRAM_URL = None

    def __init__(self):
        assert(self.COORDS[0] and self.COORDS[1])
        assert(PROGRAM_URL)

        self.program = []
        self.raw_html = None

    def __call__(self):
        self.scrape()
        self.parse()

    def parse(self):
        raise NotImplementedError

    def scrape(self):
        self.raw_html = requests.get(self.PROGRAM_URL).text


class Hasenheide(Cinema):

    COORDS = (52.4841131, 13.416982499999996)
    PROGRAM_URL = "http://www.freiluftkino-hasenheide.de/new/index.php/unser-programm"

    def parse(self):
        tree = etree.HTML(self.raw_html)
        events = tree.xpath("//*[@class='event']")

        for event in events:
            title = event.xpath(".//h1//a")[0].text
            date = event.xpath(".//*[@class='nextdate']//b")[0].text # %d.%m.%Y
            time = event.xpath(".//*[@class='evttime']")[0].split()[0] # %H:%M

            dt = datetime.datetime.strptime(date+time, "%d.%m.%Y%H:%M")
            model = {"title": title.strip().capitalize(),
                     "screening_time": utils.datetime_to_rfc3339(dt)}
            self.program.append(model)


class FreiluftFriedrichshein(Cinema):

    COORDS = (52.525347, 13.435439)
    PROGRAM_URL = "http://www.freiluftkino-berlin.de/eine_woche.php"

    def parse(self):
        tree = etree.HTML(self.raw_html)
        events = tree.xpath("//table[@class='teasertable']")

        for event in events:
            title = event.xpath(".//*[@class='teasertitel']")[0].text
            date_and_time = event.xpath(".//*[@class='teaserdatum']").text
            _, date, time = map(lambda s: s.strip(), date_and_time.split(','))

            dt = datetime.datetime.strptime(date+time, "%d.%m.%Y%H:%M")
            model = {"title": title.strip(),
                     "screening_time": utils.datetime_to_rfc3339(dt)}
            self.program.append(model)
