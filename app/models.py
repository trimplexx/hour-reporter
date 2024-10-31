from . import db
from flask_login import UserMixin


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)


class WorkHours(db.Model):
    __tablename__ = 'work_hours'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)  # Data pracy
    start_time = db.Column(db.Time, nullable=False)  # Godzina rozpoczęcia pracy
    end_time = db.Column(db.Time, nullable=True)  # Godzina zakończenia pracy

    user = db.relationship('User', backref='work_hours')


class WeekType(db.Model):
    __tablename__ = 'week_type'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True)  # Typ tygodnia np. "parzysty"

    # Relacja z tabelą StudySchedule
    study_schedules = db.relationship('StudySchedule', backref='week_type_ref')


class CourseType(db.Model):
    __tablename__ = 'course_type'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)  # Typ zajęć np. "Laboratorium"

    # Relacja z tabelą StudySchedule
    study_schedules = db.relationship('StudySchedule', backref='course_type_ref')


class StudySchedule(db.Model):
    __tablename__ = 'study_schedule'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=True)  # Konkretna data
    day_of_week = db.Column(db.String(15), nullable=True)  # Dzień tygodnia
    start_time = db.Column(db.Time, nullable=False)  # Godzina rozpoczęcia
    end_time = db.Column(db.Time, nullable=False)  # Godzina zakończenia
    subject_name = db.Column(db.String(100), nullable=False)  # Nazwa przedmiotu
    instructor_name = db.Column(db.String(100), nullable=True)  # Nazwa prowadzącego
    room = db.Column(db.String(50), nullable=True)  # Sala

    # Klucze obce do tabel słownikowych
    week_type_id = db.Column(db.Integer, db.ForeignKey('week_type.id'), nullable=True)  # Typ tygodnia
    course_type_id = db.Column(db.Integer, db.ForeignKey('course_type.id'), nullable=False)  # Typ zajęć

    # Relacja z tabelą użytkowników
    user = db.relationship('User', backref='study_schedule')
