from extensions import db, ma
from api.model import Problem

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

# For the full ProblemList Query Object
class ProblemSchema(SQLAlchemyAutoSchema):
    class Meta:
       model = Problem # Specify the model
       load_instance = True # For deserializing into model instances

# Manually
# class ProblemListSchema(ma.Schema):
#     id = ma.fields.Int(dump_only=True)
#     question = ma.fields.Str(required=True)
#     difficulty_id = ma.fields.Str(required=True)