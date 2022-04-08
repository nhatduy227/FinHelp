from flask import Blueprint, request
from .list import list_filter_stock_prices_by_company as list_price
from src.data_source.finnhub import FinnHub


stock_quote_service = Blueprint("price_blueprint", __name__, url_prefix="/quote")
finnhub = FinnHub()


@stock_quote_service.route("/list")
def list_stock_price():
    parameters = request.args
    return list_price(finnhub, parameters)
