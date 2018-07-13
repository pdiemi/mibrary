#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# api/Review.py
# --------------------------------------

import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '/' + '../..'))
from src.db import db
from src.api import User, Book

from sqlalchemy import Column, String, Integer, ForeignKey, Numeric, Date
from sqlalchemy.orm import relationship

#
# to use jsonld, we should install pyLD using:
#        pip install PyLD
#
from pyld import jsonld

class Review(db.Model):
    __tablename__ = "reviews"
    review_id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    content = db.Column(db.String(1000), nullable=False)
    fk_review_isbn = db.Column(db.String(10), ForeignKey('books.isbn'), nullable=False)
    review_book = db.relationship("Book", backref="reviews")
    fk_review_user = db.Column(db.Integer, ForeignKey('user.user_id'), nullable=False)
    user = db.relationship("User", backref="reviews")

    #
    # METHODS
    #

    def serialize(self):
        compacted_json = jsonld.compact({
            "http://schema.org/review_id": self.review_id,
            "http://schema.org/content": self.content,
            "http://schema.org/review_book": self.review_book,
            "http://schema.org/user": self.user

        }, self.get_context())

        #print(compacted_json)

        return compacted_json


    def get_context(self):
        return {
            "@context": {
            "review_id": "http://schema.org/review_id",
            "content": "http://schema.org/content",
            "review_book": "http://schema.org/review_book",
            "user": "http://schema.org/user"

            }
        }