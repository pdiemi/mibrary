#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# tests.py
# --------------------------------------

from unittest import main, TestCase
import requests
from models import Author, Book, Course, Image, Institution, Meeting, Review, User,\
                    Request, Offer, Report, Work, Course_Book
from bridge import app

endpoint = "http://mibrary.me/api/"


class TestApi(TestCase):

    def test_response_users(self):
        response = requests.get(endpoint + "users")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_response_username_1(self):
        response = requests.get(endpoint + "user/pdiemi")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_response_username_2(self):
        response = requests.get(endpoint + "user/lucy")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_response_username_3(self):
        response = requests.get(endpoint + "user/edwin")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_response_books(self):
        response = requests.get(endpoint + "books")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_response_book_isbn_1(self):
        response = requests.get(endpoint + "book/1234567890")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_response_book_isbn_2(self):
        response = requests.get(endpoint + "book/0987654321")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_response_book_isbn_3(self):
        response = requests.get(endpoint + "book/0000000000")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_response_requests(self):
        response = requests.get(endpoint + "request")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_response_request_isbn_1(self):
        response = requests.get(endpoint + "request/1234567890")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_response_request_isbn_2(self):
        response = requests.get(endpoint + "request/0987654321")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_response_request_isbn_3(self):
        response = requests.get(endpoint + "request/0000000000")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_response_offers(self):
        response = requests.get(endpoint + "offers")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_response_offer_isbn_1(self):
        response = requests.get(endpoint + "offer/1234567890")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_response_offer_isbn_2(self):
        response = requests.get(endpoint + "offer/0987654321")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_response_offer_isbn_3(self):
        response = requests.get(endpoint + "offer/0000000000")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_response_reports(self):
        response = requests.get(endpoint + "reports")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_response_report_isbn_1(self):
        response = requests.get(endpoint + "report/1234567890")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_response_report_isbn_2(self):
        response = requests.get(endpoint + "report/0987654321")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_response_report_isbn_3(self):
        response = requests.get(endpoint + "report/0000000000")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")


if __name__ == "__main__":
    main()