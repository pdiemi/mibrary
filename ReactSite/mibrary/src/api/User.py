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
from src.db import db

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
    user_id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(24), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    requested_books = db.relationship("Book")

    #
    # METHODS
    #

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email
    
    def serialize(self):
        compacted_json = jsonld.compact({
            "http://schema.org/user_id": self.user_id,
            "http://schema.org/username": self.username,
            "http://schema.org/password": self.password,
            "http://schema.org/email": self.email,
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
            "email": "http://schema.org/email",
            "requested_books": "http://schema.org/requested_books"

            }
        }