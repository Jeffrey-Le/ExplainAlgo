from extensions import db, ma
from api.model import Difficulty

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

# For the full ProblemList Query Object
class DifficultySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
       model = Difficulty # Specify the model
       load_instance = True # For deserializing into model instances

# Manually
# class DifficultySchema(ma.Schema):
#     id = ma.fields.Int(dump_only=True)
#     level = ma.fields.Str(required=True)