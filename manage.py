# -*- coding: utf-8 -*-

from flask.ext.script import Manager

from api import app
import commands


manager = Manager(app)
manager.add_command("runserver", commands.Run(host="0.0.0.0"))
manager.add_command("getshowtimes", commands.FetchAll())

if __name__ == "__main__":
    manager.run()
