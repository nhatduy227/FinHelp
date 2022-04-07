import datetime
import math
import finnhub
import requests

finnhub_client = finnhub.Client(api_key="c96hm7iad3icjtt5rcl0")

num_day = 1
num_month = 1
num_year = 2

current = math.floor(datetime.datetime.utcnow().timestamp())
_from = current - 60 * 60 * 24 * num_day
_to = current

stock_prices = finnhub_client.stock_candles('AAPL', '1', _from, _to)['t']
print("Stock PRICE here \n",stock_prices)


url = "https://yfapi.net/v6/finance/quote"

querystring = {"symbols":"A,BTC-USD,EURUSD=X"}

headers = {
    'x-api-key': "E4CQaHME2W2iS4dRhtsV981EyPiYpihb7F38FNPr"
    }

response = requests.request("GET", url, headers=headers, params=querystring)

# print(response.text)