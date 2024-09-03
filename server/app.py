import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

import logging
import marko
from dotenv import load_dotenv

import google.generativeai as genai

from gemini.config import config, safety_settings
from extensions import db, ma, logger, limiter

#from api.route import *

load_dotenv()

def create_app():
    # Configure and Intialize Gemini Model
    genai.configure(api_key=os.getenv("API_KEY"))

    model = genai.GenerativeModel(model_name="gemini-pro-vision",
                              generation_config=config,
                              safety_settings=safety_settings)

    app = Flask(__name__)
    CORS(app)

    app.config.from_object(os.environ.get('APP_SETTINGS'))
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_ACCESS_COOKIE_NAME'] = 'access_token'
    app.config['JWT_REFRESH_COOKIE_NAME'] = 'refresh_token_cookie'

    #CORS(app, resources={r"/*": {"origins": "*"}})
    db.init_app(app)
    ma.init_app(app)
    limiter.init_app(app)

    # Configure Rate Limiting
    app.limiter = limiter # Attach the limiter to the app object

    # Configure Logging
    app.logger = logger
    
    jwt = JWTManager(app)
    
    # Import Models
    from api.model import User, History, Problem, ProblemType, Difficulty, Type, ProblemSolution

    # Import Blueprints
    from api.route import problem as problem_route_bp, difficulty as difficulty_route_bp, user as user_route_bp, history as history_route_bp

    # Register Blueprints
    app.register_blueprint(problem_route_bp)
    app.register_blueprint(difficulty_route_bp)
    app.register_blueprint(user_route_bp)
    app.register_blueprint(history_route_bp)

    migrate = Migrate(app, db)

    return app
