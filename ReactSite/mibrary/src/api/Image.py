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
from src.app import db
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
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    image_url = Column(String(200))

    fk_book_isbn = Column(String(10), ForeignKey('books.isbn'), nullable=False)
    isbn = relationship("Book", backref="images")

    def __init__(self, image):
        self.image_url = image