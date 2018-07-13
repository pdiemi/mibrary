#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app.py
# --------------------------------------

from flask import Flask
from flask_cors import CORS
import  pymysql
from db import app
from mibraryapi import api_page


# app = Flask(__name__)
app.register_blueprint(api_page)
CORS(app)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, use_reloader=True, threaded=True)
