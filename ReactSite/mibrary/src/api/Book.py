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
from src.db import db

from sqlalchemy import Column, String, Integer, ForeignKey, Numeric, Date
from sqlalchemy.orm import relationship

#
# to use jsonld, we should install pyLD using:
#        pip install PyLD
#
from pyld import jsonld

class Book(db.Model):
    __tablename__ = 'books'
    isbn = db.Column(db.String(10), primary_key=True, nullable=False)
    publisher =db.Column(db.String(500), nullable=False)
    identifiers = db.Column(db.String(200), nullable=True)
    classcifications = db.Column(db.String(500), nullable=True)
    links = db.Column(db.String(500), nullable=True)
    title = db.Column(db.String(1000), nullable=False)
    subtitle = db.Column(db.String(500), nullable=False)  
    url = db.Column(db.String(500), nullable=False)
    pages = db.Column(db.Integer, nullable=False)
    subjects = db.Column(db.String(1000), nullable=True)
    date_published = db.Column(Date, nullable=False)
    excerpt = db.Column(db.String(1000), nullable=True)
    '''    
    # Additional attributes
    isbn13 = db.Column(db.String(13), nullable=False)
    dewey_decimal = db.Column(db.String(3), nullable=True)
    format_type = db.Column(db.String(20), nullable=False)
    language = db.Column(db.String(200), nullable=False)
    edition = db.Column(db.String(50), nullable=False)
    dimensions = db.Column(db.String(100), nullable=True)
    overview = db.Column(db.String(1000), nullable=True)
    synopsys = db.Column(db.String(1000), nullable=True)
    # End additional attributes
    '''
    fk_image_isbn = db.Column(db.String(10), db.ForeignKey('books.isbn'), nullable=False)
    covers = db.relationship("images")
    authors = db.relationship("Author")
    reviews = db.relationship("Review")

    #
    # METHODS
    #

    def __init__(self,
                isbn,
                publishers = None,
                identifiers = None,
                classifications = None,
                links = None,
                title = None,
                subtitle = None,
                url = None,
                pages = None,
                subjects = None,
                date_published = None,
                excerpts = None,
                covers = None,
                authors = None,
                reviews = None):

        self.isbn = isbn
        self.publishers = publishers
        self.identifiers = identifiers
        self.classifications = classifications
        self.links = links
        self.title = title
        self.subtitle = subtitle
        self.url = url
        self.pages = pages
        self.subjects = subjects
        self.date_published = date_published
        self.excerpts = excerpts
        self.covers = covers
        self.authors = authors
        self.reviews = reviews

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
