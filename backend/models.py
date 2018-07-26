#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# models.py
# --------------------------------------

from sqlalchemy import Column, String, Integer, ForeignKey, Numeric, Date, or_, and_, text
from sqlalchemy.orm import relationship
from bridge import db

#
# to use jsonld, we should install pyLD using:
#        pip install PyLD
#
from pyld import jsonld


#---------- Author ----------

class Author(db.Model):
    __tablename__ = "authors"
    author_id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.String(200), nullable=False)
    author_url = db.Column(String(500), nullable=True)
    work = db.relationship("Work", back_populates="author")

#---------- Book ----------

class Book(db.Model):
    __tablename__ = 'books'
    isbn = db.Column(db.String(10), primary_key=True, nullable=False)
    publisher =db.Column(db.String(500), nullable=False)
    identifiers = db.Column(db.String(200), nullable=True)
    classifications = db.Column(db.String(500), nullable=True)
    title = db.Column(db.String(1000), nullable=False)
    subtitle = db.Column(db.String(500), nullable=False)  
    url = db.Column(db.String(500), nullable=False)
    pages = db.Column(db.Integer, nullable=False)
    subjects = db.Column(db.String(1000), nullable=True)
    publish_date = db.Column(Date, nullable=False)
    excerpt = db.Column(db.String(1000), nullable=True)
    authors = db.Column(db.String(200), nullable=False)
    
    course = db.relationship("Course_Book", back_populates="book_course")
    work = db.relationship("Work", back_populates="book_work")
    request = db.relationship("Request", back_populates="book_request")
    offer = db.relationship("Offer", back_populates="book_offer")
    report = db.relationship("Report", back_populates="book_report")

    #
    # METHODS
    #

    def __init__(self,
                isbn,
                publisher = None,
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
                authors = None,):

        self.isbn = isbn
        self.publisher = publisher
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
        self.authors = authors


#---------- Course ----------

class Course(db.Model):
    __tablename__ = "courses"
    course_id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    course_number = db.Column(db.String(10), nullable=False)
    course_name = db.Column(db.String(500), nullable=False)
    institution_id = db.Column(db.Integer, 
                                    ForeignKey('institutions.institution_id'),
                                    nullable=False, index=True)    
    department = db.Column(db.String(100), nullable=False)

    institution = db.relationship("Institution", backref="courses", foreign_keys=[institution_id])
    book = db.relationship("Course_Book", back_populates="course")

#---------- Image ----------

class Image(db.Model):
    __tablename__ = "images"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    image_url = db.Column(db.String(200))

    book_id = db.Column(db.String(10), db.ForeignKey('books.isbn'), 
                        nullable=False, index=True)
    book = db.relationship("Book", backref="images", foreign_keys=[book_id])

    def __init__(self, image):
        self.image_url = image


#---------- Institution ----------

class Institution(db.Model):
    __tablename__ = "institutions"
    institution_id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    institutiom_code = db.Column(db.String(10), nullable=False)
    institution_name = db.Column(db.String(200), nullable=False)


#---------- Meeting ----------

class Meeting(db.Model):
    __tablename__ = "meetings"
    meeting_id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    time = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(500), nullable=False)


#---------- Review ----------

class Review(db.Model):
    __tablename__ = "reviews"
    review_id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    content = db.Column(db.String(1000), nullable=False)
    book_id = db.Column(db.String(10), ForeignKey('books.isbn'), nullable=False, index=True)
    user_id = db.Column(db.Integer, ForeignKey('users.user_id'), nullable=False, index=True)
    
    book = db.relationship("Book", backref="review_book", foreign_keys=[book_id])
    user = db.relationship("User", backref="review_user", foreign_keys=[user_id])


#---------- User ----------

class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(24), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    major = db.Column(db.String(100), nullable=True)

    request = db.relationship("Request", back_populates="user_request")
    offer = db.relationship("Offer", back_populates="user_offer")
    report = db.relationship("Report", back_populates="user_report")

    #
    # METHODS
    #

    def __init__(self, username, password, email, major):
        self.username = username
        self.password = password
        self.email = email
        self.major = major
#---------- Association Classes ----------

class Request(db.Model):
    __tablename__ = "requests"
    date = db.Column(Date, nullable=True)
    book_id = db.Column(db.String(10), ForeignKey('books.isbn'), 
                        primary_key=True, nullable=False)
    username = db.Column(db.Integer, ForeignKey('users.user_id'), 
                        primary_key=True, nullable=False)
    meeting_id = db.Column(db.Integer, ForeignKey('meetings.meeting_id'), 
                            nullable=False, index=True)
    
    book_request = db.relationship("Book", back_populates="request")
    user_request = db.relationship("User", back_populates="request")
    meeting = db.relationship("Meeting", backref="requests", foreign_keys=[meeting_id])

    def __init__(self, date, book, user):
        self.date = date
        self.book = book
        self.user = user


class Offer(db.Model):
    __tablename__ = "offers" 
    date = db.Column(Date, nullable=True) 
    book_id = db.Column(db.String(10), ForeignKey('books.isbn'), 
                        primary_key=True, nullable=False)
    username = db.Column(db.String, ForeignKey('users.username'), 
                        primary_key=True, nullable=False)
    meeting_id = db.Column(db.Integer, ForeignKey('meetings.meeting_id'), 
                            nullable=False, index=True)
    
    book_offer = db.relationship("Book", back_populates="offer")
    user_offer = db.relationship("User", back_populates="offer")
    meeting = db.relationship("Meeting", backref="offers", foreign_keys=[meeting_id])

    def __init__(self, date, book, user):
        self.date = date
        self.book = book
        self.user = user


class Report(db.Model):
    __tablename__ = "reports" 
    date = db.Column(Date, nullable=True) 
    book_id = db.Column(db.String(10), ForeignKey('books.isbn'), 
                        primary_key=True, nullable=False)
    username = db.Column(db.String, ForeignKey('users.user_id'), 
                        primary_key=True, nullable=False)
    
    book_report = db.relationship("Book", back_populates="report")
    user_report = db.relationship("User", back_populates="report")

    def __init__(self, date, book, user):
        self.date = date
        self.book = book
        self.user = user


class Work(db.Model):
    __tablename__ = "works"
    date = db.Column(Date, nullable=True)
        
    book_id = db.Column(db.String(10), ForeignKey('books.isbn'), 
                            primary_key=True, nullable=False)
    author_id = db.Column(db.Integer, ForeignKey('authors.author_id'), 
                            primary_key=True, nullable=False)
    
    book_work = db.relationship("Book", back_populates="work")
    author = db.relationship("Author", back_populates="work")

    def __init__(self, date, book, author):
        self.date = date
        self.book = book
        self.author = author


class Course_Book(db.Model):
    __tablename__ = "course_book"
        
    book_id = db.Column(db.String(10), ForeignKey('books.isbn'), 
                            primary_key=True, nullable=False)
    course_id = db.Column(db.Integer, ForeignKey('courses.course_id'), 
                            primary_key=True, nullable=False)
    
    book_course = db.relationship("Book", back_populates="course")
    course = db.relationship("Course", back_populates="book")