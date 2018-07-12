#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# api/Image.py
# --------------------------------------

import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '/' + '../..'))
from db import db
from src.api import Book

from sqlalchemy import Column, String, Integer, ForeignKey, Numeric, Date
from sqlalchemy.orm import relationship

#
# to use jsonld, we should install pyLD using:
#        pip install PyLD
#
from pyld import jsonld

class Image(db.Model):
    __tablename__ = "images"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    image_url = db.Column(db.String(200))

    fk_image_isbn = db.Column(db.String(10), db.ForeignKey('books.isbn'), nullable=False)
    isbn = db.relationship("Book", backref="images")

    def __init__(self, image):
        self.image_url = image