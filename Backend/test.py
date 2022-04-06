import datetime
import math
import finnhub

finnhub_client = finnhub.Client(api_key="c96hm7iad3icjtt5rcl0")

num_day = 1
num_month = 1
num_year = 2

current = math.floor(datetime.datetime.utcnow().timestamp())
_from = current - 60 * 60 * 24 * num_day
_to = current

stock_prices = finnhub_client.stock_candles('AAPL', '1', _from, _to)["c"]
print(len(stock_prices))
