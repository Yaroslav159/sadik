# kindergarten/utils.py
from datetime import date, timedelta

def count_weekdays(start_date, end_date):
    """Возвращает количество рабочих дней (пн–пт) между start_date и end_date (не включая end_date)."""
    if start_date >= end_date:
        return 0
    days = 0
    current = start_date
    while current < end_date:
        if current.weekday() < 5:
            days += 1
        current += timedelta(days=1)
    return days

def get_next_working_days(start_date, num_days=10):
    if start_date.weekday() >= 5:
        start_date += timedelta(days=(7 - start_date.weekday()))
    dates = []
    current = start_date
    while len(dates) < num_days:
        if current.weekday() < 5:
            dates.append(current)
        current += timedelta(days=1)
    return dates

def get_menu_schedule(start_cycle_date=None):
    if start_cycle_date is None:
        start_cycle_date = date(2025, 9, 1) 

    today = date.today()
    first_day = today if today.weekday() < 5 else today + timedelta(days=(7 - today.weekday()))
    working_days = get_next_working_days(first_day, 10)

    schedule = []
    for dt in working_days:
        workdays = count_weekdays(start_cycle_date, dt)
        day_number = (workdays % 10) + 1
        schedule.append((dt, day_number))
    return schedule