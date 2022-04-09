import requests
from config.config import Config
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import pandas


class FinancialModeling:
    def __init__(self):
        self.client = Config.financial_modeling
        options = Options()
        options.headless = True
        self.driver = webdriver.Chrome(
            executable_path="./config/chromedriver",
            options=options
        )

    def get_financial_report(self, symbol):
        url = f"{Config.financial_modeling}/income-statement/{symbol}"
        params = {
            "symbol": symbol,
            "limit": 1,
            "apikey": Config.financial_modeling_api_key
        }

        response = requests.get(url, params)
        if response.status_code != 200:
            return None

        response = response.json()
        if len(response) == 0:
            return None

        load_html = requests.get("https://www.microsoft.com/investor/reports/ar21/index.html").text

        soup = BeautifulSoup(load_html).text
        print(soup)

        return response
