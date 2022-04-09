from flask import Blueprint, request
from .summarize import summarize_financial_report_by_symbol as summarize_financial_report
from src.data_source.financial_modeling import FinancialModeling


summarize_financial_report_service = Blueprint(
    "summarize_financial_report_blueprint", __name__, url_prefix="/financial-report"
)
financial_modeling = FinancialModeling()


@summarize_financial_report_service.route("/summary")
def list_stock_news():
    parameters = request.args

    return summarize_financial_report(financial_modeling, parameters)
