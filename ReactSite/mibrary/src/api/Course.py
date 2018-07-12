#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# api/Course.py
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

class Course(db.Model):
    __tablename__ = "courses"
    course_id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    course_number = Column(String(10), nullable=False)
    course_name = Column(String(500), nullable=False)
    textbooks = relationship("Book")
    institution = relationship("Institution")

    #
    # METHODS
    #

    def serialize(self):
        compacted_json = jsonld.compact({
            "http://schema.org/course_id": self.course_id,
            "http://schema.org/course_number": self.course_number,
            "http://schema.org/course_name": self.course_name,
            "http://schema.org/textbooks": self.textbooks,
            "http://schema.org/institution": self.institution

        }, self.get_context())

        #print(compacted_json)

        return compacted_json


    def get_context(self):
        return {
            "@context": {
            "course_id": "http://schema.org/course_id",
            "course_number": "http://schema.org/course_number",
            "course_name": "http://schema.org/course_name",
            "textbooks": "http://schema.org/textbooks",
            "institution": "http://schema.org/institution"

            }
        }
