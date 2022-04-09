def summarize_financial_report(data_source, parameters):
    if "symbol" not in parameters:
        return {
            "message": "missing parameter: \"symbol\"",
            "status_code": 400
        }

    symbol = parameters["symbol"]
    return data_source.get_financial_report(symbol)
