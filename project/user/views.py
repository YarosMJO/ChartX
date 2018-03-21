# project/user/views.py

#################
#### imports ####
#################

from flask import render_template, Blueprint, url_for, redirect, flash, request
from flask_login import login_user, logout_user, login_required, current_user
from project.models import User, Details
from project import app, db, bcrypt
# from project.email import send_email
from datetime import datetime
from tempfile import mkdtemp
from sqlalchemy import func

from .helpers import*
import distutils
import requests

from project.token import generate_confirmation_token, confirm_token
from project.email import send_email

################
#### config ####
################
if app.config["DEBUG"]:
    @app.after_request
    def after_request(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Expires"] = 0
        response.headers["Pragma"] = "no-cache"
        return response

    # configure session to use filesystem (instead of signed cookies)
    app.config["SESSION_FILE_DIR"] = mkdtemp()
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "filesystem"


user_blueprint = Blueprint('user', __name__)

################
#### routes ####
################

# @app.before_request
# def make_session_permanent():
#     session.permanent = True

@user_blueprint.route('/confirm/<token>')
@login_required
def confirm_email(token):
    try:
        email = confirm_token(token)
    except:
        flash('The confirmation link is invalid or has expired.', 'danger')

    user = Details.query.filter_by(user_id = current_user.id).first_or_404()
    if user.confirmed:
        flash('Account already confirmed. Please login.', 'success')
    else:
        user.confirmed = True
        user.confirmed_on = func.now()
        db.session.add(user)
        db.session.commit()
        flash('You have confirmed your account. Thanks!', 'success')
    return redirect(url_for('main.home'))

@user_blueprint.route('/authorize', methods=['GET', 'POST'])
def authorize():
    form = request.form
    username = form.get('username')
    usernameReg = form.get('usernameReg')

    if form.get("signInButton") :
        """Log user in."""
        if current_user.is_authenticated:
            return redirect(url_for('main.home'))
        # if user reached route via POST (as by submitting a form via POST)
        if request.method == "POST":

            # ensure username or pwd was submitted
            if not username or not form.get("pass"):
                flash('must provide username or pass', 'danger')
                return apology("must provide username or pass")

            user = User.query.filter_by(name = username).first()

            remember_me = False
            if form.get("check"): remember_me = True

            # ensure username exists and password is correct
            if user and bcrypt.check_password_hash(user.password, form.get("pass")):
                login_user(user, remember=remember_me)
                flash('Welcome.', 'success')
                return redirect(url_for('main.home'))
            else:
                flash('Invalid email and/or password.', 'danger')
                return render_template('user/authorize.html', form=form)

    else:
        """Register user."""
        # if user reached route via POST (as by submitting a form via POST)
        if request.method == "POST":

            # ensure username was submitted
            if not usernameReg:
                return apology("Missing username!")
            # ensure password was submitted
            elif not form.get("password"):
                return apology("Missing password!")
            # ensure confirm_password was submitted
            elif not form.get("confirm_password"):
                return apology("Missing confirm password!")
            elif not form.get("password")==form.get("confirm_password"):
                return apology("Passwords do not match!")
            elif not form.get("email"):
                return apology("Missing email!")

            try:
                countryJson = requests.get('https://api.ipdata.co/').json()
                countryCode = countryJson['country_code']
            except:
                countryCode = None

            user = User.query.filter_by(name = usernameReg).first()
            if user is None:
                gender = None;
                if not form.get("gender") == "null":
                    gender =  bool(distutils.util.strtobool(form.get("gender")))

                user = User(password = form.get("password"), name = usernameReg)
                db.session.add(user)
                db.session.commit()

                email = form.get("email")
                details = Details(email = email, gender = gender, age = int(form.get("age")), locale = countryCode, user_id = user.id, confirmed = False, user = user)
                db.session.add(details)
                db.session.commit()

            else:
                return apology("Something wrong...Maybe the username was already registered.")

            token = generate_confirmation_token(email)

            confirm_url = url_for('user.confirm_email', token=token, _external=True)
            html = render_template('user/activate.html', confirm_url = confirm_url)
            subject = "Please confirm your email"
            send_email(email, subject, html)
            login_user(user)

            flash('You registered and are now logged in. Welcome!', 'success')
            return redirect(url_for('main.home'))

            # return redirect(url_for("unconfirmed"))

    return render_template("user/authorize.html", form=form)

@user_blueprint.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You were logged out.', 'success')
    return redirect(url_for('user.authorize'))