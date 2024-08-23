from extensions import db, ma
from api.model import ProblemSolution

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

# For the full ProblemList Query Object
class ProblemSolutionSchema(ma.SQLAlchemyAutoSchema):
    solution_text = ma.Str(data_key='solutionText')  # Serialize 'solution_text' as 'solutionText'
    created_at = ma.DateTime(data_key='createdDate')  # Serialize 'created_at' as 'createdDate'
    updated_at = ma.DateTime(data_key='updatedDate')  # Serialize 'updated_at' as 'updatedDate'

    class Meta:
       model = ProblemSolution # Specify the model
       load_instance = True # For deserializing into model instances

# Manually
# class DifficultySchema(ma.Schema):
#     id = ma.fields.Int(dump_only=True)
#     level = ma.fields.Str(required=True)