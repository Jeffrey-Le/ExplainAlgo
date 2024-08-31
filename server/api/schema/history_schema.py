from extensions import db, ma
from api.model import History

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from api.schema import ProblemSchema, UserSchema, ProblemSolutionSchema

# For the full ProblemList Query Object
class HistorySchema(ma.SQLAlchemyAutoSchema):
    solved_at = ma.Str(data_key='solvedDate')  # Serialize 'solved_at' as 'solvedDate'
    
    class Meta:
       model = History # Specify the model
       #include_fk = True # This includes foreign keys like difficulty_id
       load_instance = True # For deserializing into model instances

    problem = ma.Nested(ProblemSchema)
    cur_user= ma.Nested(UserSchema)
    #solution = ma.Nested(ProblemSolutionSchema)

# Manually
# class HistorySchema(ma.Schema):
#     id = ma.fields.Int(dump_only=True)
#     question = ma.fields.Str(required=True)
#     difficulty_id = ma.fields.Str(required=True)