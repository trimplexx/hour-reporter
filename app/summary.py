import holidays
from flask_login import current_user
from app.models import WorkHours
import datetime


def get_summary_data(month, year):
    first_day = datetime.date(year, month, 1)
    last_day = (first_day.replace(day=28) + datetime.timedelta(days=4)).replace(day=1) - datetime.timedelta(days=1)

    work_records = WorkHours.query.filter(
        WorkHours.user_id == current_user.id,
        WorkHours.date >= first_day,
        WorkHours.date <= last_day
    ).all()

    work_hours_data = []
    total_work_hours = 0
    polish_holidays = holidays.Poland(years=year)

    for day in range(1, last_day.day + 1):
        date = datetime.date(year, month, day)
        is_holiday = date in polish_holidays
        is_weekend = date.weekday() >= 5
        holiday_name = polish_holidays.get(date) if is_holiday else None

        daily_records = [record for record in work_records if record.date == date]
        daily_work_hours = sum(
            (datetime.datetime.combine(date, record.end_time) - datetime.datetime.combine(date, record.start_time)).seconds / 3600
            for record in daily_records if record.end_time
        )

        hours = int(daily_work_hours)
        minutes = int((daily_work_hours - hours) * 60)
        formatted_work_hours = f"{hours}h {minutes}m" if hours or minutes else "0h 0m"

        total_work_hours += daily_work_hours
        work_hours_data.append({
            'date': date,
            'is_holiday': is_holiday,
            'is_weekend': is_weekend,
            'holiday_name': holiday_name,
            'total_work_hours': daily_work_hours,
            'formatted_work_hours': formatted_work_hours,
            'work_records': daily_records
        })

    total_hours = int(total_work_hours)
    total_minutes = int((total_work_hours - total_hours) * 60)
    formatted_total_work_hours = f"{total_hours}h {total_minutes}m"

    return {
        'work_hours_data': work_hours_data,
        'total_work_hours': total_work_hours,
        'formatted_total_work_hours': formatted_total_work_hours,
        'month': month,
        'year': year
    }
