#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# main.py
# --------------------------------------
import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '/' + '..'))

from src.api.User import User
from src.api.Book import Book
from src.api.Course import Course
from src.api.Review import Review
from src.api.Meeting import Meeting
from src.api.Author import Author
from src.api.Image import Image
from src.api.Institution import Institution

from src.api.Association import Request
from src.api.Association import Offer
from src.api.Association import Report
from src.api.Association import Work
from src.api.Association import Course_Book

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///idb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
ma = Marshmallow(app)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, use_reloader=True, threaded=True)
