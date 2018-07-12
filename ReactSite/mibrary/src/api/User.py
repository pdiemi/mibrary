#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# api/User.py
# --------------------------------------

import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '/' + '../..'))
from src.app import app, db

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Integer, ForeignKey, Numeric, Date
from sqlalchemy.orm import relationship


#
# to use jsonld, we should install pyLD using:
#        pip install PyLD
#
from pyld import jsonld

class User(db.Model):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    username = Column(String(20), nullable=False)
    password = Column(String(24), nullable=False)
    requested_books = relationship("Book")

    #
    # METHODS
    #

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def serialize(self):
        compacted_json = jsonld.compact({
            "http://schema.org/user_id": self.user_id,
            "http://schema.org/username": self.username,
            "http://schema.org/password": self.password,
            "http://schema.org/requested_books": self.requested_books

        }, self.get_context())

        #print(compacted_json)

        return compacted_json


    def get_context(self):
        return {
            "@context": {
            "user_id": "http://schema.org/user_id",
            "username": "http://schema.org/username",
            "password": "http://schema.org/password",
            "requested_books": "http://schema.org/requested_books"

            }
        }