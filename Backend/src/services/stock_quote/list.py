def list_filter_stock_prices_by_company(data_source, parameters):
    if "symbol" not in parameters:
        return {
            "message": "missing \"symbol\"",
            "status_code": 400
        }

    if "type" not in parameters:
        chart_type = "line"
    else:
        chart_type = parameters["type"]

    if "time_stamp" not in parameters:
        time_stamp = "1H"
    else:
        time_stamp = parameters["time_stamp"]

    return {
        "message": "successfully pull data",
        "status_code": 200,
        "data": data_source.get_stock_quote_by_period(parameters["symbol"], 1648819800, 1649340285)
    }


def format_data(data):
    parsed_data = dict()
    meta = data["meta"]
    parsed_data["symbol"] = meta["symbol"]
    parsed_data["timezone"] = meta["timezone"]
    parsed_data["currency"] = meta["currency"]
    parsed_data["trading_periods"] = meta["tradingPeriods"]

    parsed_data["timestamp"] = data["timestamp"]
    parsed_data["quotes"] = data["indicators"]["quote"][0]

    return parsed_data
