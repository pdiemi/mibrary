#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# api/Association.py
# --------------------------------------

import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '/' + '../..'))
from db import db
from src.api.User import User
from src.api.Book import Book
from src.api.Course import Course
from src.api.Review import Review
from src.api.Meeting import Meeting
from src.api.Author import Author
from src.api.Image import Image
from src.api.Institution import Institution

from sqlalchemy import Column, String, Integer, ForeignKey, Numeric, Date
from sqlalchemy.orm import relationship

#
# to use jsonld, we should install pyLD using:
#        pip install PyLD
#
from pyld import jsonld

class Request(db.Model):
    __tablename__ = "requests"
    date = db.Column(Date, nullable=True)
        
    fk_request_isbn = db.Column(db.String(10), db.ForeignKey('books.isbn'), primary_key=True, nullable=False)
    book = db.relationship("Book", back_populates="books")
    fk_request_user = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True, nullable=False)
    user = db.relationship("User", back_populates="users")

    fk_request_meeting = db.Column(db.Integer, db.ForeignKey('meetings.meeting_id'), nullable=False)
    meeting = db.relationship("Meeting", backref="requests")

    def __init__(self, date, book, user):
        self.date = date
        self.book = book
        self.user = user


class Offer(db.Model):
    __tablename__ = "offers" 
    date = db.Column(Date, nullable=True) 
        
    fk_offer_isbn = db.Column(db.String(10), db.ForeignKey('books.isbn'), primary_key=True, nullable=False)
    book = db.relationship("Book", back_populates="books")
    fk_offer_user = db.Column(db.Integer, ForeignKey('users.user_id'), primary_key=True, nullable=False)
    user = db.relationship("User", back_populates="users")

    fk_offer_meeting = db.Column(db.Integer, db.ForeignKey('meetings.meeting_id'), nullable=False)
    meeting = db.relationship("Meeting", backref="offers")

    def __init__(self, date, book, user):
        self.date = date
        self.book = book
        self.user = user


class Report(db.Model):
    __tablename__ = "reports" 
    date = db.Column(Date, nullable=True) 
        
    fk_report_isbn = db.Column(db.String(10), db.ForeignKey('books.isbn'), primary_key=True, nullable=False)
    book = db.relationship("Book", back_populates="books")
    fk_report_user = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True, nullable=False)
    user = db.relationship("User", back_populates="users")

    def __init__(self, date, book, user):
        self.date = date
        self.book = book
        self.user = user


class Work(db.Model):
    __tablename__ = "works"
    date = db.Column(Date, nullable=True)
        
    fk_work_isbn = db.Column(db.String(10), db.ForeignKey('books.isbn'), 
                            primary_key=True, nullable=False)
    book = db.relationship("Book", back_populates="books")
    fk_work_author = db.Column(db.Integer, db.ForeignKey('authors.author_id'), 
                            primary_key=True, nullable=False)
    author = db.relationship("Author", back_populates="authors")

    def __init__(self, date, book, author):
        self.date = date
        self.book = book
        self.author = author


class Course_Book(db.Model):
    __tablename__ = "course_book"
        
    fk_cb_isbn = db.Column(db.String(10), db.ForeignKey('books.isbn'), 
                        primary_key=True, nullable=False)
    book = db.relationship("Book", back_populates="books")
    fk_cb_course = db.Column(db.Integer, db.ForeignKey('courses.course_id'), 
                            primary_key=True, nullable=False)
    author = db.relationship("Course", back_populates="courses")