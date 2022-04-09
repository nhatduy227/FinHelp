import datetime
import math


def validate_time_option(time_option):
    time_options = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "Max"]
    return time_option in time_options


def convert_time_option(time_option):
    if not validate_time_option(time_option):
        return None, None

    current_time = math.floor(datetime.datetime.now().timestamp())

