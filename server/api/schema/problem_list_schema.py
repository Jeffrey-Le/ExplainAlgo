from extensions import db, ma
from api.model import ProblemList

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

# For the full ProblemList Query Object
class ProblemListSchema(SQLAlchemyAutoSchema):
    class Meta:
       model = ProblemList # Specify the model
       load_instance = True # For deserializing into model instances

# Manually
# class ProblemListSchema(ma.Schema):
#     id = ma.fields.Int(dump_only=True)
#     question = ma.fields.Str(required=True)
#     difficulty_id = ma.fields.Str(required=True)