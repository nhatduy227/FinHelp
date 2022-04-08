def list_news_by_company(data_source, parameters):
    if "symbol" not in parameters:
        return {
            "message": "missing parameter: \"symbol\"",
            "status_code": 400
        }
    params = {"symbol": parameters["symbol"], "page": 1, "limit": 10}
    if "page" in parameters:
        params["page"] = int(parameters["page"])
    if "limit" in parameters:
        params["limit"] = int(parameters["limit"])

    return {
        "message": "successfully query",
        "data": data_source.list_news_by_company(params["symbol"], params["limit"], params["page"]),
        "status_code": 200
    }
