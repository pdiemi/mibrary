#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# api/Meeting.py
# --------------------------------------

import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '/' + '../..'))
from src.api.User import User
#from src.api.Book import Book

from src.api.Association import Request
from src.api.Association import Offer
from src.api.Association import Report
from src.api.Association import Work
from src.api.Association import Course_Book

from src.db import app, db

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
        fields = ('username', 'password', 'email')


user_schema = UserSchema()
users_schema = UserSchema(many=True)


# endpoint to show all users
@api_page.route("/api/user", methods=["GET"])
def get_user():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result.data)

# endpoint to get user detail by username
@api_page.route("/api/user/<username>", methods=["GET"])
def user_detail(username):
    user = User.query.get(username)
    return user_schema.jsonify(user)


# --------------------------------------
# api for Offer
# --------------------------------------



# --------------------------------------
# api for Request
# --------------------------------------


# --------------------------------------
# api for Report
# --------------------------------------

'''
# --------------------------------------
# api for Course
# --------------------------------------

class CourseSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('number', 'name', 'institution', 'textbook')


course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)

# endpoint to show all courses of an isntitution 
@api_page.route("/api/course/<institution>", methods=["GET"])
def get_course(institution):
    all_courses =User.query.get(institution)
    return course_schema.jsonify(all_courses)

# endpoint to get user detail by username
@api_page.route("/api/user/<course_number>", methods=["GET"])
def course_detail(course_number):
    course = User.query.get(course_number)
    return user_schema.jsonify(course)

# --------------------------------------
# api for Review 
# --------------------------------------


# --------------------------------------
# api for Meeting
# --------------------------------------


# --------------------------------------
# api for Book
# --------------------------------------

class BookSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('title', 'author')


book_schema = BookSchema()
books_schema = BookSchema(many=True)


# endpoint to show all users
@api_page.route("/api/book", methods=["GET"])
def get_book():
    all_books = Book.query.all()
    result = books_schema.dump(all_books)
    return jsonify(result.data)

'''