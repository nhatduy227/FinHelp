from config.config import Config
import requests


class YahooFinance:
    def __init__(self):
        self.url = Config.yahoo_finance_domain

    def get_stock_quote_by_period(self, symbol, period1, period2):
        data = dict()

        params = {
            "period1": period1,
            "period2": period2,
            "includePrePost": True,
            "corsDomain": "finance.yahoo.com"
        }
        url = f"{self.url}/{symbol}"

        response = requests.get(url, headers={"User-agent": "Mozilla-5"}, params=params)
        if response.status_code != 200:
            return None

        response = response.json()["chart"]["result"][0]

        return response


# import datetime
# import math
# import finnhub
#
# finnhub_client = finnhub.Client(api_key="c96hm7iad3icjtt5rcl0")
#
# num_day = 1
# num_month = 1
# num_year = 2
#
# current = math.floor(datetime.datetime.utcnow().timestamp())
# _from = current - 60 * 60 * 24 * 30
# _to = current
#
# stock_prices = finnhub_client.stock_candles('AAPL', 'W', _from, _to)
#
# print(len(stock_prices["c"]), len(stock_prices["t"]))
# print(stock_prices)
