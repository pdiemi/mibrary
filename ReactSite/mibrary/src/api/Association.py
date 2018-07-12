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
from src.app import db
from src.api import Book, User, Course, Review, Meeting, Author, Image, Institution

from sqlalchemy import Column, String, Integer, ForeignKey, Numeric, Date
from sqlalchemy.orm import relationship

#
# to use jsonld, we should install pyLD using:
#        pip install PyLD
#
from pyld import jsonld

class Request(db.Model):
    __tablename__ = "requests"
    date = Column(Date, nullable=True)
        
    fk_request_isbn = Column(String(10), ForeignKey('books.isbn'), primary_key=True, nullable=False)
    book = relationship("Book", back_populates="books")
    fk_request_user = Column(Integer, ForeignKey('users.user_id'), primary_key=True, nullable=False)
    user = relationship("User", back_populates="users")

    fk_request_meeting = Column(Integer, ForeignKey('meetings.meeting_id'), nullable=False)
    meeting = relationship("Meeting", backref="requests")


class Offer(db.Model):
    __tablename__ = "offers" 
    date = Column(Date, nullable=True) 
        
    fk_offer_isbn = Column(String(10), ForeignKey('books.isbn'), primary_key=True, nullable=False)
    book = relationship("Book", back_populates="books")
    fk_offer_user = Column(Integer, ForeignKey('users.user_id'), primary_key=True, nullable=False)
    user = relationship("User", back_populates="users")

    fk_offer_meeting = Column(Integer, ForeignKey('meetings.meeting_id'), nullable=False)
    meeting = relationship("Meeting", backref="offers")


class Report(db.Model):
    __tablename__ = "reports" 
    date = Column(Date, nullable=True) 
        
    fk_report_isbn = Column(String(10), ForeignKey('books.isbn'), primary_key=True, nullable=False)
    book = relationship("Book", back_populates="books")
    fk_report_user = Column(Integer, ForeignKey('users.user_id'), primary_key=True, nullable=False)
    user = relationship("User", back_populates="users")


class Work(db.Model):
    __tablename__ = "works"
    date = Column(Date, nullable=True)
        
    fk_work_isbn = Column(String(10), ForeignKey('books.isbn'), primary_key=True, nullable=False)
    book = relationship("Book", back_populates="books")
    fk_work_author = Column(Integer, ForeignKey('authors.author_id'), primary_key=True, nullable=False)
    author = relationship("Author", back_populates="authors")


class Course_Book(db.Model):
    __tablename__ = "course_book"
        
    fk_cb_isbn = Column(String(10), ForeignKey('books.isbn'), primary_key=True, nullable=False)
    book = relationship("Book", back_populates="books")
    fk_cb_course = Column(Integer, ForeignKey('courses.course_id'), primary_key=True, nullable=False)
    author = relationship("Course", back_populates="courses")
