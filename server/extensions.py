from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_wtf import CSRFProtect

import google.generativeai as genai
import os

import logging

from gemini.config import config, safety_settings
from gemini.rubric import RubricManager
from gemini.response_analyzer import analyze_response
from gemini.problem_generator import ProblemGenerator

# Defaults
db = SQLAlchemy()
ma = Marshmallow()
limiter = Limiter(get_remote_address, default_limits=["200 per day", "50 per hour"])
csrf = CSRFProtect()

# Basic Configuration
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# For Custom Logger
# logger = logging.getLogger(__name__)
# logger.setLevel(logging.INFO)
# handler = logging.StreamHandler()
# handler.setLevel(logging.INFO)
# formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# handler.setFormatter(formatter)
# logger.addHandler(handler)

# Gemini
genai.configure(api_key=os.getenv("API_KEY"))

model = genai.GenerativeModel(model_name="gemini-1.5-flash",
                            generation_config=config,
                            safety_settings=safety_settings)
gem = {
    "rubric_manager": RubricManager(),
    }

gem['problem_generator'] = ProblemGenerator(model, gem['rubric_manager'])