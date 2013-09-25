# -*- coding: utf-8 -*-

import locale

from flask.ext.script import Command, Server

import cinemas


# TODO: since these commands are quite simple, how would this look with @command?

class FetchAll(Command):

    def run(self):
        for cinema_cls in cinemas.known_cinemas():
            cinema = cinema_cls()
            print "Fetching showtimes for %s" % cinema.name
            cinema.update_program()


class Run(Server):

    def __init__(self, *args, **kwargs):
        print " * Preparing environment"
        self.prepare_env()
        super(Run, self).__init__(*args, **kwargs)

    def prepare_env(self):
        # TODO: doesn't really sit well here, find a better place
        locale.setlocale(locale.LC_ALL, "de_DE.UTF-8")
        
