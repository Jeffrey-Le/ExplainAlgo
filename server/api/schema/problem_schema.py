from extensions import db, ma
from api.model import Problem

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from api.schema.difficulty_schema import DifficultySchema
from api.schema.problem_solution_schema import ProblemSolutionSchema

# For the full ProblemList Query Object
class ProblemSchema(ma.SQLAlchemyAutoSchema):
    question_title = ma.Str(data_key='questionTitle')  # Serialize 'question_title' as 'questionTitle'
    created_at = ma.DateTime(data_key='createdDate')  # Serialize 'created_at' as 'createdDate'
    updated_at = ma.DateTime(data_key='updatedDate')  # Serialize 'updated_at' as 'updatedDate'

    class Meta:
       model = Problem # Specify the model
       #include_fk = True # This includes foreign keys like difficulty_id
       load_instance = True # For deserializing into model instances

    difficulty = ma.Nested(DifficultySchema)
    solution = ma.List(ma.Nested(ProblemSolutionSchema))

# Manually
# class ProblemListSchema(ma.Schema):
#     id = ma.fields.Int(dump_only=True)
#     question = ma.fields.Str(required=True)
#     difficulty_id = ma.fields.Str(required=True)