import bcrypt
from flask import Blueprint, render_template, redirect, url_for, flash, request
from . import db
from .models import User
from flask_login import login_user, login_required, logout_user, current_user
import re

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if not user or not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            flash('Nieprawidłowa nazwa użytkownika lub hasło.', 'danger')
            return render_template('auth/login.html', email=email)

        login_user(user)
        flash('Zalogowano pomyślnie.', 'success')
        return redirect(url_for('main.index'))

    return render_template('auth/login.html')


@auth.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    if request.method == 'POST':
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')

        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        password_regex = '^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$'

        if not re.match(email_regex, email):
            flash('Nieprawidłowy format adresu email.', 'danger')
            return render_template('auth/register.html', first_name=first_name, last_name=last_name, email=email)

        if not re.match(password_regex, password):
            flash('Hasło musi mieć co najmniej 8 znaków, zawierać litery i cyfry.', 'danger')
            return render_template('auth/register.html', first_name=first_name, last_name=last_name, email=email)

        if password != confirm_password:
            flash('Hasła nie pasują do siebie.', 'danger')
            return render_template('auth/register.html', first_name=first_name, last_name=last_name, email=email)

        if User.query.filter_by(email=email).first():
            flash('Email jest już zarejestrowany.', 'danger')
            return render_template('auth/register.html', first_name=first_name, last_name=last_name, email=email)

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        new_user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        flash('Konto zostało utworzone. Możesz się zalogować.', 'success')
        return redirect(url_for('auth.login'))

    return render_template('auth/register.html')


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Wylogowano pomyślnie.', 'info')
    return redirect(url_for('auth.login'))
