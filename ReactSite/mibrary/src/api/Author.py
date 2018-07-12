#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# api/Author.py
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

class Author(db.Model):
    __tablename__ = "authors"
    author_id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    name = Column(String(200), nullable=False)
    author_url = Column(String(500), nullable=True)
    
    #
    # METHODS
    #

    def serialize(self):
        compacted_json = jsonld.compact({
            "http://schema.org/author_id": self.author_id,
            "http://schema.org/name": self.name,
            "http://schema.org/author_url": self.author_url

        }, self.get_context())

        #print(compacted_json)

        return compacted_json


    def get_context(self):
        return {
            "@context": {
            "author_id": "http://schema.org/author_id",
            "name": "http://schema.org/name",
            "author_url": "http://schema.org/author_url"
            }
        }
