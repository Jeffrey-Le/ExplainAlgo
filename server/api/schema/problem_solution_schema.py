from extensions import db, ma
from api.model import ProblemSolution

from marshmallow import pre_load, post_dump, ValidationError
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

# For the full ProblemList Query Object
class ProblemSolutionSchema(ma.SQLAlchemyAutoSchema):
    solution_text = ma.Str(data_key='solution')  # Serialize 'solution_text' as 'solution'
    created_at = ma.DateTime(data_key='createdDate', dump_only=True)  # Serialize 'created_at' as 'createdDate'
    updated_at = ma.DateTime(data_key='updatedDate', dump_only=True)  # Serialize 'updated_at' as 'updatedDate'

    class Meta:
       model = ProblemSolution # Specify the model
       include_fk = True # This includes foreign keys like problem_id
       load_instance = True # For deserializing into model instances

    @pre_load
    def process_preload(self, data, **kwargs):
         # Validate problem_id if it's expected to be an integer
        if "problem_id" in data and isinstance(data["problem_id"], str):
            try:
                data["problem_id"] = int(data["problem_id"])
            except ValueError:
                raise ValidationError("problem_id must be an integer.")
        
        # Optional debugging print
        print(f"Preloaded data: {data}")
        return data

    @post_dump
    def process_postdump(self, data, **kwargs):
        if "problem_id" in data:
            data.pop("problem_id", None) 

        return data

# Manually
# class DifficultySchema(ma.Schema):
#     id = ma.fields.Int(dump_only=True)
#     level = ma.fields.Str(required=True)