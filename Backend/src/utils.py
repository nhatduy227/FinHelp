import datetime

def get_from_to_time(self):
    to_date_str = datetime.datetime.now().strftime("%m-%d-%Y")
    from_date_str = datetime.date(
        datetime.date.today().year - 1,
        datetime.date.today().month,
        datetime.date.today().day
    )
    return to_date_str, from_date_str