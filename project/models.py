# project/models.py

from project import db, bcrypt
from sqlalchemy.orm import relationship
from sqlalchemy import func, ForeignKey, event
from sqlalchemy.engine import Engine
from sqlite3 import Connection as SQLite3Connection


import sqlite3

from sqlalchemy.engine import Engine
from sqlalchemy import event

@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    if type(dbapi_connection) is sqlite3.Connection:  # play well with other DB backends
       cursor = dbapi_connection.cursor()
       cursor.execute("PRAGMA foreign_keys=ON")
       cursor.close()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    password = db.Column(db.String, nullable=False)
    detailRel = db.relationship('Details', backref='user', lazy='joined', uselist=False)

    def __init__(self, name, password):
        self.name = name
        self.password = bcrypt.generate_password_hash(password)

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def get_id(self):
        return self.id

    def __repr__(self):
        return '<name {}'.format(self.name)

class Details(db.Model):
    __tablename__ = "details"

    id = db.Column(db.Integer, primary_key = True)

    confirmed = db.Column(db.Boolean, nullable = True)
    confirmed_on = db.Column(db.DateTime, nullable = True)
    registered_on = db.Column(db.DateTime, nullable = False)
    email = db.Column(db.String, unique = False, nullable = False) # in production set to unique=True
    locale = db.Column(db.String, nullable = True)
    gender = db.Column(db.Boolean, nullable = True)
    age = db.Column(db.Integer, nullable = True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, email, gender, age, locale, user_id, user = None, confirmed_on = None, confirmed = False):
        self.confirmed = confirmed
        self.confirmed_on = confirmed_on
        self.registered_on = func.now()
        self.email = email
        self.gender = gender
        self.age = age
        self.locale = locale
        self.user_id = user_id
        self.user = user

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

