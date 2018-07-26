from unittest import main, TestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

class UnitTests(TestCase):
	def setUp (self) :
		self.driver = webdriver.Chrome("tests/drivers/chromedriver")

	def test_nav(self) :
		self.driver.get("http://localhost:3000/")
		try:
			topnav = WebDriverWait(self.driver, 10).until(
				EC.presence_of_element_located((By.CLASS_NAME, "topnav"))
			)
			links = topnav.find_elements_by_tag_name("a")
			self.assertEquals(len(links), 5)
		except TimeoutException as ex:
			print("Timed out on finding topnav")
			assert(False)

	def test_books(self) :
		self.driver.get("http://localhost:3000/books")
		try:
			content = WebDriverWait(self.driver, 10).until(
				EC.presence_of_element_located((By.ID, "searchable-content"))
			)
			detailCards = WebDriverWait(self.driver, 10).until(
				EC.presence_of_element_located((By.CLASS_NAME, "detailCards"))
			)
			assert(len(detailCards) > 0);
		except TimeoutException as ex:
			print("Timed out on finding books content")
			assert(False)

	def test_users(self) :
		self.driver.get("http://localhost:3000/users")
		try:
			content = WebDriverWait(self.driver, 10).until(
				EC.presence_of_element_located((By.ID, "searchable-content"))
			)
			detailCards = WebDriverWait(self.driver, 10).until(
				EC.presence_of_element_located((By.CLASS_NAME, "detailCards"))
			)
			assert(len(detailCards) > 0);
		except TimeoutException as ex:
			print("Timed out on finding users content")
			assert(False)

	def test_courses(self) :
		self.driver.get("http://localhost:3000/courses")
		try:
			content = WebDriverWait(self.driver, 10).until(
				EC.presence_of_element_located((By.ID, "searchable-content"))
			)
			detailCards = WebDriverWait(self.driver, 10).until(
				EC.presence_of_element_located((By.CLASS_NAME, "detailCards"))
			)
			assert(len(detailCards) > 0);
		except TimeoutException as ex:
			print("Timed out on finding course content")
			assert(False)

	def test_one_book(self) :
		self.driver.get("http://localhost:3000/books")
		try:
			content = WebDriverWait(self.driver, 10).until(
				EC.presence_of_element_located((By.ID, "searchable-content"))
			)
			detailCards = WebDriverWait(self.driver, 10).until(
				EC.presence_of_element_located((By.CLASS_NAME, "detailCards"))
			)
			searchBox = WebDriverWait(self.driver, 10).until(
				EC.presence_of_element_located((By.ID, "SearchBox"))
			)
			searchBox.send_keys('car');
			detailCards = WebDriverWait(self.driver, 10).until(
				EC.presence_of_element_located((By.CLASS_NAME, "detailCards"))
			)
			assert(len(detailCards) > 1);
			inputBox = WebDriverWait(self.driver, 10).until(
				EC.presence_of_element_located((By.ID, "filter0Box"))
			)
			inputBox.send_keys('fiction');
			assert(len(detailCards) == 1);
			link = WebDriverWait(self.driver, 10).until(
				EC.presence_of_element_located((By.ID, "9780618706419"))
			)
			link.click();
			title = WebDriverWait(self.driver, 10).until(
				EC.presence_of_element_located((By.TAG_NAME, "h1"))
			)
			self.assertEquals(title.text, "The things they carried");
		except TimeoutException as ex:
			print("Timed out on finding one book content")
			assert(False)

if __name__ == '__main__':
    main()