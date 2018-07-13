#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app.py
# --------------------------------------

import os
import sys

from flask import Flask
from flask_cors import CORS
from db import app
from src.api.mibraryapi import api_page
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '/' + '..'))





# app = Flask(__name__)
app.register_blueprint(api_page)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://mibrary:mibraryaadelm@mibrarydb.cgjjkbdulbzo.us-east-2.rds.amazonaws.com:3306/mibrarydb'
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, use_reloader=True, threaded=True)
