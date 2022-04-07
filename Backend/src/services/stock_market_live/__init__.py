from flask import Blueprint, request
from .list import list_filter_stock_prices_by_company as list_price
from src.data_source.finnhub import FinnHub


stock_price_service = Blueprint("price_blueprint", __name__, url_prefix="/price")
finnhub = FinnHub()


@stock_price_service.route("/list")
def list_stock_price():
    parameters = request.args
    return list_price(finnhub, parameters)