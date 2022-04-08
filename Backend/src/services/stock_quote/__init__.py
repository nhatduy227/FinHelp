from flask import Blueprint, request
from .list import list_filter_stock_prices_by_company as list_quote
from src.data_source.yahoo_finance import YahooFinance


stock_quote_service = Blueprint("quote_blueprint", __name__, url_prefix="/quote")
yahoo_finance = YahooFinance()


@stock_quote_service.route("/list")
def list_stock_quote():
    parameters = request.args
    return list_quote(yahoo_finance, parameters)
