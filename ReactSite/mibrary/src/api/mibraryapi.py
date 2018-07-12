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
from src.app import app, db, ma
from src.api.User import User
from src.api.Book import Book
from src.api.Course import Course
from src.api.Review import Review
from src.api.Meeting import Meeting
from src.api.Author import Author
from src.api.Image import Image
from src.api.Institution import Institution

from src.api.Association import Request
from src.api.Association import Offer
from src.api.Association import Report
from src.api.Association import Work
from src.api.Association import Course_Book

from flask import Flask, send_from_directory, render_template, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, or_, text
from flask_cors import CORS
from copy import copy
import re
import datetime


# --------------------------------------
# api for User
# --------------------------------------

class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('username', 'password', 'email')


user_schema = UserSchema()
users_schema = UserSchema(many=True)


# endpoint to create new user
@app.route("/user", methods=["POST"])
def add_user():
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']
    
    new_user = User(username, password, email)

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user)

# endpoint to show all users
@app.route("/user", methods=["GET"])
def get_user():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result.data)

# --------------------------------------
# api for Offer
# --------------------------------------

# endpoint to create new offer
@app.route("/offer", methods=["POST"])
def add_offer():
    date = datetime.date.today()
    book = request.json['book']
    user = request.json['user']
    
    new_offer = Offer(date, book, user)

    db.session.add(new_offer)
    db.session.commit()

    return jsonify(new_offer)

# --------------------------------------
# api for Request
# --------------------------------------

# endpoint to create new request
@app.route("/request", methods=["POST"])
def add_request():
    date = datetime.date.today()
    book = request.json['book']
    user = request.json['user']
    
    new_request = Request(date, book, user)

    db.session.add(new_request)
    db.session.commit()

    return jsonify(new_request)

# --------------------------------------
# api for Report
# --------------------------------------

# endpoint to create new report
@app.route("/report", methods=["POST"])
def add_report():
    date = datetime.date.today()
    book = request.json['book']
    user = request.json['user']
    
    new_report = Report(date, book, user)

    db.session.add(new_report)
    db.session.commit()

    return jsonify(new_report)

# --------------------------------------
# api for Course
# --------------------------------------


# --------------------------------------
# api for Review 
# --------------------------------------


# --------------------------------------
# api for Meeting
# --------------------------------------


# --------------------------------------
# api for Book
# --------------------------------------