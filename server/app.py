import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv

from extensions import db, ma

#from api.route import *

load_dotenv()

def create_app():

    app = Flask(__name__)

    app.config.from_object(os.environ.get('APP_SETTINGS'))
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # Import Models
    from api.model import ProblemList, Difficulty

    # Import Blueprints
    from api.route import problem_list as problem_list_route_bp
    from api.route import difficulty as difficulty_route_bp

    # Register Blueprints
    app.register_blueprint(problem_list_route_bp)
    app.register_blueprint(difficulty_route_bp)

    migrate = Migrate(app, db)

    return app
