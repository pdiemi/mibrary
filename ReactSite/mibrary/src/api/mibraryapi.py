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
        fields = ('id', 'username', 'password', 'email')


user_schema = UserSchema()
users_schema = UserSchema(many=True)


# endpoint to show all users
@api_page.route("/users", methods=["GET"])
def get_user():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result.data)

# endpoint to get user detail by username
@api_page.route("/user/<username>", methods=["GET"])
def user_detail(username):
    user = User.query.get(username)
    return user_schema.jsonify(user)


# --------------------------------------
# api for Offer
# --------------------------------------

class OfferSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('date', 'book_id', 'user_id', 'meeting_id')


offer_schema = OfferSchema()
offers_schema = OfferSchema(many=True)


# endpoint to show all offers
@api_page.route("/offered-books", methods=["GET"])
def get_offer():
    all_offers = Offer.query.all()
    result = offers_schema.dump(all_offers)
    return jsonify(result.data)

# endpoint to get offer detail by book_id
@api_page.route("/offered-book/<book_id>", methods=["GET"])
def offer_detail(book_id):
    offer = Offer.query.get(book_id)
    return offer_schema.jsonify(offer)


# --------------------------------------
# api for Request
# --------------------------------------

class RequestSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('date', 'book_id', 'user_id', 'meeting_id')


request_schema = RequestSchema()
requests_schema = RequestSchema(many=True)


# endpoint to show all requests
@api_page.route("/requested-books", methods=["GET"])
def get_request():
    all_requests = Request.query.all()
    result = requests_schema.dump(all_requests)
    return jsonify(result.data)

# endpoint to get request detail by book_id
@api_page.route("/requested-book/<book_id>", methods=["GET"])
def request_detail(book_id):
    my_request = Request.query.get(book_id)
    return request_schema.jsonify(my_request)

# --------------------------------------
# api for Report
# --------------------------------------

class ReportSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('date', 'book_id', 'user_id')


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
def report_detail(book_id):
    report = Report.query.get(book_id)
    return report_schema.jsonify(report)

# --------------------------------------
# api for Course
# --------------------------------------

class CourseSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('course_number', 'course_name', 'institution_id')


course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)

# endpoint to show all courses of an isntitution 
@api_page.route("/course/<institution>", methods=["GET"])
def get_course(institution):
    all_courses =User.query.get(institution)
    return course_schema.jsonify(all_courses)

# endpoint to get course detail by course_number
@api_page.route("/course/<course_number>", methods=["GET"])
def course_detail(course_number):
    course = User.query.get(course_number)
    return user_schema.jsonify(course)

# --------------------------------------
# api for Review 
# --------------------------------------

class ReviewSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('date', 'content', 'book_id', 'user_id')


review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)


# endpoint to get review detail by book_id
@api_page.route("/reviews/<book_id>", methods=["GET"])
def review_detail(book_id):
    review = Review.query.get(book_id)
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
# api for Book
# --------------------------------------

class BookSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('isbn', 'publishers', 'identifiers', 'classifications',
                    'title', 'subtitle', 'url', 'pages', 'date_published',
                    'excerpts', 'authors')

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
def book_detail(isbn):
    book = Book.query.get(isbn)
    return book_schema.jsonify(book)