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

from flask import render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, or_, text
from src.app import app,db
from copy import copy
import mibraryapi, Book, User, Course, Review, Meeting, Author, Image, Institution
import re

'''...still working...'''