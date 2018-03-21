# project/config.py

import os
basedir = os.path.abspath(os.path.dirname(__file__))# __file__ - current module(in which we call,)

class BaseConfig(object):
    """Base configuration."""
    SECRET_KEY = 'my_precious'
    DEBUG = False
    BCRYPT_LOG_ROUNDS = 13
    WTF_CSRF_ENABLED = True
    DEBUG_TB_ENABLED = False
    DEBUG_TB_INTERCEPT_REDIRECTS = False

    MAIL_SERVER = "smtp.googlemail.com"
    MAIL_USERNAME = "myhajlivej@gmail.com"
    MAIL_PASSWORD = "250819981zxc"
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    URL_SERIALIZE_SKEY = "mail_secret"
    SECURITY_PASSWORD_SALT = 'my_precious_two'
    SECRET_KEY = "secret"

# MAIL_USERNAME = os.environ['APP_MAIL_USERNAME']
# MAIL_PASSWORD = os.environ['APP_MAIL_PASSWORD']

    MAIL_DEFAULT_SENDER = 'myhajlivej@gmail.com'
    # SQLALCHEMY_ECHO = True


class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = True
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'dev.sqlite')
    DEBUG_TB_ENABLED = True



class TestingConfig(BaseConfig):
    """Testing configuration."""
    TESTING = True
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 1
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'sqlite://'


class ProductionConfig(BaseConfig):
    """Production configuration."""
    SECRET_KEY = 'my_precious'
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://localhost/example'
    DEBUG_TB_ENABLED = False
    STRIPE_SECRET_KEY = 'foo'
    STRIPE_PUBLISHABLE_KEY = 'bar'
