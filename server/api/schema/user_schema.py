from extensions import db, ma
from api.model import User

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

# For the full ProblemList Query Object
class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
       model = User # Specify the model
       load_instance = True # For deserializing into model instances

# Manually
# class UserSchema(ma.Schema):
#     id = ma.fields.Int(dump_only=True)
#     question = ma.fields.Str(required=True)
#     difficulty_id = ma.fields.Str(required=True)