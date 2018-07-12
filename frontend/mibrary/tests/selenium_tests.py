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
		finally:
			self.driver.quit()

if __name__ == '__main__':
    main()