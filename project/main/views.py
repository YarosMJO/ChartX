# project/main/views.py

#################
#### imports ####
#################

from flask import render_template, Blueprint
from flask_login import login_required
from project.history.historyParser import*
# from project.history import*
################
#### config ####
################

main_blueprint = Blueprint('main', __name__,)

################
#### routes ####
################

@main_blueprint.route('/')
@main_blueprint.route('/index')
@login_required
def home():
    return render_template('main/index.html', data = parse())
