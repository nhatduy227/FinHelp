import requests
from config.config import Config
from src import utils


class FinancialModeling:
    def __init__(self):
        self.client = Config.financial_modeling

    def get_financial_report(self, symbol, length=0.3):
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

        final_link = response[0]["finalLink"]

        return utils.summarize_article(final_link, length)
