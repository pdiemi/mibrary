#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# api/Institution.py
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

class Institution(db.Model):
    __tablename__ = "institutions"
    institution_id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    institutiom_code = db.Column(db.String(10), nullable=False)
    institution_name = db.Column(db.String(200), nullable=False)

    #
    # METHODS
    #

    def serialize(self):
        compacted_json = jsonld.compact({
            "http://schema.org/institution_id": self.institution_id,
            "http://schema.org/institution_code": self.institutiom_code,
            "http://schema.org/institution_name": self.institution_name

        }, self.get_context())

        #print(compacted_json)

        return compacted_json


    def get_context(self):
        return {
            "@context": {
            "institution_id": "http://schema.org/institution_id",
            "insttution_code": "http://schema.org/institution_code",
            "institution_name": "http://schema.org/institution_name"

            }
        }