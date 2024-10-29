from flask import Blueprint, render_template, redirect, url_for, flash, request
from . import db
from .models import User
from flask_login import login_user, login_required, logout_user
from werkzeug.security import generate_password_hash, check_password_hash

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Logika logowania
        pass
    return render_template('auth/login.html')

@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Logika rejestracji
        pass
    return render_template('auth/register.html')

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))
