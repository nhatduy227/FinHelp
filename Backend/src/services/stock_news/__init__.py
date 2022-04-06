from flask import Blueprint, request
from .list import list_news_by_company as list_news
from src.data_source.finnhub import FinnHub


stock_news_service = Blueprint("news_blueprint", __name__, url_prefix="/news")
finnhub = FinnHub()


@stock_news_service.route("/list")
def list_stock_news():
    parameters = request.args
    return list_news(finnhub, parameters)
