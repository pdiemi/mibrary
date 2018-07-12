#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# api/Meeting.py
# --------------------------------------

import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '/' + '../..'))
from src.app import db

from sqlalchemy import Column, String, Integer, ForeignKey, Numeric, Date
from sqlalchemy.orm import relationship

#
# to use jsonld, we should install pyLD using:
#        pip install PyLD
#
from pyld import jsonld

class Meeting(db.Model):
    __tablename__ = "meetings"
    meeting_id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    time = Column(String(50), nullable=False)
    location = Column(String(500), nullable=False)
    users = relationship("User")
    books = relationship("Book")

    #
    # METHODS
    #

    def serialize(self):
        compacted_json = jsonld.compact({
            "http://schema.org/meeting_id": self.meeting_id,
            "http://schema.org/time": self.time,
            "http://schema.org/location": self.location,
            "http://schema.org/users": self.users,
            "http://schema.org/books": self.books

        }, self.get_context())

        #print(compacted_json)

        return compacted_json


    def get_context(self):
        return {
            "@context": {
            "meeting_id": "http://schema.org/meeting_id",
            "time": "http://schema.org/time",
            "location": "http://schema.org/location",
            "users": "http://schema.org/users",
            "books": "http://schema.org/books"

            }
        }