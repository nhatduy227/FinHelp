import datetime
import math
from urllib import response
def convert_time(timestamp):
    return datetime.datetime.fromtimestamp(timestamp).strftime('%b-%d-%Y')
def list_filter_stock_prices_by_company(finhub,parameters):
    if "symbol" not in parameters:
        return {
            "message": "missing parameter: \"symbol\"",
            "status_code": 400
        }

    params = {"symbol": parameters["symbol"], "resolution":"D", "daynum": 7}
    if "resolution" in parameters:
        params["resolution"] = parameters["resolution"]
    
    if "daynum" in parameters:
        params["daynum"] = int(parameters["daynum"])


    current = math.floor(datetime.datetime.utcnow().timestamp())
    _from = current - 60 * 60 * 24 * params["daynum"]
    _to = current
 
    close_date_response = finhub.list_filter_stock_prices_by_company(params["symbol"], params["resolution"], _from, _to)
    closeList = close_date_response[0]
    dateList = close_date_response[1]
    # dateList = [convert_time(timestamp) for timestamp in close_date_response[1]]

    
    return {
        "message": "successfully query",
        "data": [{"close":x, "date":y} for x,y in zip(closeList,dateList)],
        "status_code": 200
    }

