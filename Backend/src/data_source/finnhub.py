import datetime

import finnhub
from config.config import Config


class FinnHub:
    def __init__(self):
        self.client = finnhub.Client(Config.finhub_api_key)

    def list_news_by_company(self, symbol, limit=10, page=1):
        if limit <= 0:
            limit = 10

        if page <= 0:
            page = 1

        data = self.client.company_news(symbol, "2021-01-01", datetime.date.today().strftime('%Y-%m-%d'))

        if len(data) <= limit:
            return data

        start = limit * page
        end = limit * page + limit
        paging_data = data[start:end]

        return paging_data
