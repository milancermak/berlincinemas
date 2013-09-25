# -*- coding: utf-8 -*-

from flask.ext.script import Manager
from flask.ext.script import Command, Server
from mongokit import Connection
from api import handlers
import locale

connection = None

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
        global connection
        print " * DB connection ..."
    	handlers.app.config["MONGODB_HOST"] = '127.0.0.1'
        handlers.app.config["MONGODB_PORT"] = 27017
        handlers.app.config['MONGODB_DB'] = 'berlincinemas'
        connection = Connection( handlers.app.config['MONGODB_HOST'], handlers.app.config['MONGODB_PORT'] )
	print " * Setting locale ..."
	locale.setlocale(locale.LC_ALL, "de_DE.UTF-8")

manager = Manager(handlers.app)
manager.add_command("runserver", Run(host="0.0.0.0", debug=True))
manager.add_command("getshowtimes", FetchAll())

if __name__ == "__main__":
    manager.run()
