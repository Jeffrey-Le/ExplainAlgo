import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

from extensions import db, ma

#from api.route import *

load_dotenv()

def create_app():

    app = Flask(__name__)

    app.config.from_object(os.environ.get('APP_SETTINGS'))
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    jwt = JWTManager(app)

    # Import Models
    from api.model import User, History, Problem, ProblemType, Difficulty, Type, ProblemSolution

    # Import Blueprints
    from api.route import problem as problem_route_bp, difficulty as difficulty_route_bp, user as user_route_bp

    # Register Blueprints
    app.register_blueprint(problem_route_bp)
    app.register_blueprint(difficulty_route_bp)
    app.register_blueprint(user_route_bp)

    migrate = Migrate(app, db)

    return app
