from extensions import db, ma
from api.model import User

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

# For the full ProblemList Query Object
# class UserSchema(SQLAlchemyAutoSchema):
#     class Meta:
#        model = User # Specify the model
#        load_instance = True # For deserializing into model instances

# Manually
class UserSchema(SQLAlchemyAutoSchema):
    id = ma.Int(dump_only=True)
    username = ma.Str(required=True)
    email = ma.Str(required=True)
    role = ma.Str(required=True)
    created_at = ma.DateTime(data_key='createdDate') # Serialize 'created_at' as 'createdDate'
    updated_at = ma.DateTime(data_key='updatedDate') # Serialize 'updated_at' as 'updatedDate'