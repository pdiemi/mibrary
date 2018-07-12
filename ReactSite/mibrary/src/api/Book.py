#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# api/Book.py
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

class Book(db.Model):
    __tablename__ = 'books'
    isbn = Column(String(10), primary_key=True, nullable=False)
    publisher =Column(String(500), nullable=False)
    identifiers = Column(String(200), nullable=True)
    classcifications = Column(String(500), nullable=True)
    links = Column(String(500), nullable=True)
    title = Column(String(1000), nullable=False)
    subtitle = Column(String(500), nullable=False)  
    url = Column(String(500), nullable=False)
    pages = Column(Integer, nullable=False)
    subjects = Column(String(1000), nullable=True)
    date_published = Column(Date, nullable=False)
    excerpt = Column(String(1000), nullable=True)
    '''    
    # Additional attributes
    isbn13 = Column(String(13), nullable=False)
    dewey_decimal = Column(String(3), nullable=True)
    format_type = Column(String(20), nullable=False)
    language = Column(String(200), nullable=False)
    edition = Column(String(50), nullable=False)
    dimensions = Column(String(100), nullable=True)
    overview = Column(String(1000), nullable=True)
    synopsys = Column(String(1000), nullable=True)
    # End additional attributes
    '''
    covers = relationship("images")
    authors = relationship("Author")
    reviews = relationship("Review")

    #
    # METHODS
    #

    def serialize(self):
        compacted_json = jsonld.compact({
            "http://schema.org/isbn": self.isbn,
            "http://schema.org/publisher": self.publisher,
            "http://schema.org/identifiers": self.identifiers,
            "http://schema.org/classifications": self.classcifications,
            "http://schema.org/links": self.links,
            "http://schema.org/title": self.title,
            "http://schema.org/subtitle": self.subtitle,
            "http://schema.org/url": self.url,
            "http://schema.org/pages": self.pages,
            "http://schema.org/nr_of_subjects": self.subjects,
            "http://schema.org/date_published": self.date_published,
            "http://schema.org/excerpt": self.excerpt,
'''
            # Additional attributes
            "http://schema.org/isbn13": self.isbn13,
            "http://schema.org/dewey_decimal": self.dewey_decimal,
            "http://schema.org/format_type": self.format_type,
            "http://schema.org/language": self.language,
            "http://schema.org/edition": self.edition,
            "http://schema.org/dimesions": self.dimensions,
            "http://schema.org/overview": self.overview,
            "http://schema.org/synopsys": self.synopsys,
            # End additional attributes
'''
            "http://schema.org/covers": self.covers,
            "http://schema.org/authors": self.authors,
            "http://schema.org/nr_of_reviews": self.reviews
        }, self.get_context())

        #print(compacted_json)

        return compacted_json


    def get_context(self):
        return {
            "@context": {
            "isbn": "http://schema.org/isbn",
            "publisher": "http://schema.org/publisher",
            "identifiers": "http://schema.org/identifiers",
            "classcifications": "http://schema.org/classifications",
            "links": "http://schema.org/links",
            "title": "http://schema.org/title",
            "subtitle": "http://schema.org/subtitle",
            "url": "http://schema.org/url",
            "pages": "http://schema.org/pages",
            "subjects": "http://schema.org/nr_of_subjects",
            "date_published": "http://schema.org/date_published",
            "excerpt": "http://schema.org/excerpt",
            # Additional attributes
            "isbn13": "http://schema.org/isbn13",
            "dewey_decimal": "http://schema.org/dewey_decimal",
            "format_type": "http://schema.org/format_type",
            "language": "http://schema.org/language",
            "edition": "http://schema.org/edition",
            "dimensions": "http://schema.org/dimesions",
            "overview": "http://schema.org/overview",
            "synopsys": "http://schema.org/synopsys",
            # End additional attributes
            }
        }
