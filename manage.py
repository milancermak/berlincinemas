# -*- coding: utf-8 -*-

from flask.ext.script import Manager
from flask.ext.script import Server
import api
import locale

class Run(Server):

    def __init__(self, *args, **kwargs):
        print " * Preparing environment"
        self.prepare_env()
        super(Run, self).__init__(*args, **kwargs)

    def prepare_env(self):
        locale.setlocale(locale.LC_ALL, "de_DE.UTF-8")

manager = Manager(api.app)
manager.add_command("runserver", Run(host="0.0.0.0", debug=True))

if __name__ == "__main__":
    manager.run()
