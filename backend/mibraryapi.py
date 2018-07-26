#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# mibrary.py
# --------------------------------------

from models import Author, Book, Course, Image, Institution, Meeting, Review, User,\
                    Request, Offer, Report, Work, Course_Book

from bridge import app, db

from flask import Flask, send_from_directory, render_template, jsonify, request, abort, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import func, or_, text
from flask_cors import CORS
from copy import copy
import re
import datetime

api_page = Blueprint("api_page", __name__)

ma = Marshmallow(app)

# --------------------------------------
# api for User
# --------------------------------------

class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('user_id', 'username', 'email', 'major')


user_schema = UserSchema()
users_schema = UserSchema(many=True)


# endpoint to show all users
@api_page.route("/users", methods=["GET"])
def get_user():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result.data)

# endpoint to get user detail by username
@api_page.route("/user/<user_name>", methods=["GET"])
def user_detail_username(user_name):
    user = User.query.filter_by(username = user_name).first()
    return user_schema.jsonify(user)

# endpoint to get user detail by email
@api_page.route("/user/email/<user_email>", methods=["GET"])
def user_detail_email(user_email):
    user = User.query.filter_by(email = user_email).first()
    return user_schema.jsonify(user)

# endpoint to get user detail by major
@api_page.route("/user/major/<user_major>", methods=["GET"])
def user_detail_major(user_major):
    user = User.query.filter_by(major = user_major).all()
    return users_schema.jsonify(user)

# endpoint to create new user
@app.route("/user/create-user", methods=["POST"])
def add_user():
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']  
    major = request.json['major']
    #major = request.json['major']
    
    new_user = User(username, password, email, major)

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user)

# --------------------------------------
# api for Offer
# --------------------------------------

class OfferSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('date', 'book_id', 'username', 'meeting_id')


offer_schema = OfferSchema()
offers_schema = OfferSchema(many=True)


# endpoint to show all offers
@api_page.route("/offered-books", methods=["GET"])
def get_offer():
    all_offers = Offer.query.all()
    result = offers_schema.dump(all_offers)
    return jsonify(result.data)

# endpoint to get offer detail by book_id (isbn)
@api_page.route("/offered-book/<isbn>", methods=["GET"])
def offer_detail_isbn(isbn):
    offer = Offer.query.filter_by(book_id = isbn).all()
    return offer_schema.jsonify(offer)

# endpoint to get offer detail by username
@api_page.route("/offered-book/<user_name>", methods=["GET"])
def offer_detail_user(user_name):
    offer = Offer.query.filter_by(username = user_name).all()
    return offer_schema.jsonify(offer)

# endpoint to add a new offer
@app.route("/offered-book/add-offer", methods=["POST"])
def add_offer():
    date = request.json['date']
    username = request.json['username']
    book_id = request.json['book_id']
    
    new_offer = Offer(date, username, book_id)

    db.session.add(new_offer)
    db.session.commit()

    return jsonify(new_offer)

# --------------------------------------
# api for Request
# --------------------------------------

class RequestSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('date', 'book_id', 'username', 'meeting_id')


request_schema = RequestSchema()
requests_schema = RequestSchema(many=True)


# endpoint to show all requests
@api_page.route("/requested-books", methods=["GET"])
def get_request():
    all_requests = Request.query.all()
    result = requests_schema.dump(all_requests)
    return jsonify(result.data)

# endpoint to get request detail by book_id
@api_page.route("/requested-book/<isbn>", methods=["GET"])
def request_detail_isbn(isbn):
    my_request = Request.query.filter_by(book_id = isbn).all()
    return request_schema.jsonify(my_request)

# endpoint to get request detail by username
@api_page.route("/requested-book/<user_name>", methods=["GET"])
def request_detail_user(user_name):
    my_request = Request.query.filter_by(username = user_name).all()
    return request_schema.jsonify(my_request)

# endpoint to add a new request
@app.route("/requested-book/add-request", methods=["POST"])
def add_request():
    date = request.json['date']
    username = request.json['username']
    book_id = request.json['book_id']
    
    new_request = Request(date, username, book_id)

    db.session.add(new_request)
    db.session.commit()

    return jsonify(new_request)


# --------------------------------------
# api for Report
# --------------------------------------

class ReportSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('date', 'book_id', 'username')


report_schema = ReportSchema()
reports_schema = ReportSchema(many=True)


# endpoint to show all reports
@api_page.route("/reported-books", methods=["GET"])
def get_report():
    all_reports = Report.query.all()
    result = reports_schema.dump(all_reports)
    return jsonify(result.data)

# endpoint to get report detail by book_id
@api_page.route("/reported-book/<book_id>", methods=["GET"])
def report_detail_isbn(isbn):
    report = Report.query.filter_by(book_id = isbn).all()
    return report_schema.jsonify(report)

# endpoint to get report detail by username
@api_page.route("/reported-book/<user_name>", methods=["GET"])
def report_detail_user(user_name):
    report = Report.query.filter_by(username = user_name).all()
    return report_schema.jsonify(report)

# endpoint to add a new report
@app.route("/reported-book/add-report", methods=["POST"])
def add_report():
    date = request.json['date']
    username = request.json['username']
    book_id = request.json['book_id']
    
    new_report = Report(date, username, book_id)

    db.session.add(new_report)
    db.session.commit()

    return jsonify(new_report)


# --------------------------------------
# api for Course
# --------------------------------------

class CourseSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('course_id', 'course_number', 'course_name', 'institution_id', 'department')


course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)

# endpoint to show all courses of an isntitution given its code
@api_page.route("/course/institution/<institution_code>", methods=["GET"])
def get_course(institution_code):
    all_courses =Course.query.filter_by(institution_id = institution_code).all()
    return courses_schema.jsonify(all_courses)

# endpoint to get course detail by course_number
@api_page.route("/course/<course_id>", methods=["GET"])
def course_detail_course_id(course_id):
    course = Course.query.get(course_id)
    return course_schema.jsonify(course)

# endpoint to get course detail by course_id
@api_page.route("/course/course-number/<coursenumber>", methods=["GET"])
def course_detail(coursenumber):
    course = Course.query.filter_by(course_number = coursenumber).all()
    return courses_schema.jsonify(course)

# endpoint to get all courses by department
@api_page.route("/course/department/<department>", methods=["GET"])
def get_course_department(department):
    course = Course.query.filter_by(department =department).all()
    return user_schema.jsonify(course)

# --------------------------------------
# api for Review 
# --------------------------------------

class ReviewSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('date', 'content', 'book_id', 'username')


review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)


# endpoint to get review detail by book_id
@api_page.route("/reviews/<isbn>", methods=["GET"])
def review_detail_isbn(isbn):
    review = Review.query.filter_by(book_id = isbn).all()
    return review_schema.jsonify(review)

# endpoint to get review detail by username
@api_page.route("/reviews/<user_name>", methods=["GET"])
def review_detail_user(user_name):
    review = Review.query.filter_by(username = user_name).all()
    return review_schema.jsonify(review)

# --------------------------------------
# api for Meeting
# --------------------------------------

class MeetingSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('meeting_id', 'time', 'location')


meeting_schema = MeetingSchema()
meetings_schema = MeetingSchema(many=True)


# endpoint to get meeting detail by meeting_id
@api_page.route("/meeting/<meeting_id>", methods=["GET"])
def meeting_detail(meeting_id):
    meeting = Meeting.query.get(meeting_id)
    return meeting_schema.jsonify(meeting)


# --------------------------------------
# api for Work
# --------------------------------------

class WorkSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('book_id', 'author_id', 'date')

work_schema = WorkSchema()
works_schema = WorkSchema(many=True)


# endpoint to show all works
@api_page.route("/works", methods=["GET"])
def get_work():
    all_works = Work.query.all()
    result = works_schema.dump(all_works)
    return jsonify(result.data)

# endpoint to get work detail by isbn
@api_page.route("/work/<isbn>", methods=["GET"])
def work_detail_isbn(isbn):
    work = Work.query.filter_by(book_id = isbn).all()
    return work_schema.jsonify(work)


# --------------------------------------
# api for Course_Book
# --------------------------------------

class Course_BookSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('book_id', 'course_id')


course_book_schema = Course_BookSchema()
course_books_schema = Course_BookSchema(many=True)

# endpoint to get book detail by course_id
@api_page.route("/course-book/book/<course_id>", methods=["GET"])
def book_detail_course_id(course_id):
    #book = Course_Book.query.filter_by(course_id = course_id).all()
    book = Book.query.join(Course_Book, Book.isbn == Course_Book.book_id)   \
                .filter(Course_Book.course_id == course_id).all()
    return books_schema.jsonify(book)

# --------------------------------------
# api for Book
# --------------------------------------

class BookSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('isbn', 'publisher', 'identifiers', 'classifications',
                    'title', 'subtitle', 'url', 'pages', 'subjects',
                    'publish_date', 'excerpt', 'authors')

book_schema = BookSchema()
books_schema = BookSchema(many=True)


# endpoint to show all books
@api_page.route("/books", methods=["GET"])
def get_book():
    all_books = Book.query.all()
    result = books_schema.dump(all_books)
    return jsonify(result.data)

# endpoint to get book detail by isbn
@api_page.route("/book/<isbn>", methods=["GET"])
def book_detail_isbn(isbn):
    book = Book.query.get(isbn)
    return book_schema.jsonify(book)

# endpoint to get book detail by exact title
@api_page.route("/book/title/<title>", methods=["GET"])
def book_detail_title(title):
    book = Book.query.filter_by(title = title).all()
    return book_schema.jsonify(book)

# endpoint to get book detail by author
#   or by the first author if there are many
@api_page.route("/book/author/<author>", methods=["GET"])
def book_detail_author(author):
    book = Book.query.filter_by(authors = author).all()
    return book_schema.jsonify(book)

# endpoint to get book detail by subject
@api_page.route("/book/subject/<subject>", methods=["GET"])
def book_detail_subject(subject):
    book = Book.query.filter_by(subjects = subject).all()
    return book_schema.jsonify(book)

# endpoint to add new book
@app.route("/add-book", methods=["POST"])
def add_book():

    isbn = request.json['isbn']
    publisher = request.json['publisher']
    identifiers = request.json['identifiers']
    classifications = request.json['classifications']
    title = request.json['title']
    subtitle = request.json['subtitle']
    url = request.json['url']
    pages = request.json['pages']
    subjects = request.json['subjects']
    published_date = request.json['published_date']
    excerpt = request.json['excerpt']
    authors = request.json['authors']
    
    new_book = Book(isbn, publisher, identifiers, classifications, title, subtitle, url,
                    pages, subjects, published_date, excerpt, authors)

    db.session.add(new_book)
    db.session.commit()

    return jsonify(new_book)

# endpoint to delete a book given its isbn
@app.route("/book/delete-book/isbn", methods=["DELETE"])
def book_delete(isbn):
    book = Book.query.get(isbn)
    db.session.delete(book)
    db.session.commit()

    return user_schema.jsonify(book)   

# endpoint to sort books by title
@api_page.route("/books/sorted-title", methods=["GET"])
def sort_book_title():
    all_books = Book.query.order_by(Book.title).all()
    result = books_schema.dump(all_books)
    return jsonify(result.data)