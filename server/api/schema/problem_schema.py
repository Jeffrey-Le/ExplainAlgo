from extensions import db, ma
from api.model import Problem, Difficulty

from marshmallow import pre_load, post_dump, ValidationError
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from api.schema.difficulty_schema import DifficultySchema
from api.schema.problem_solution_schema import ProblemSolutionSchema

# For the full ProblemList Query Object
class ProblemSchema(ma.SQLAlchemyAutoSchema):
    question_title = ma.Str(data_key='questionTitle')  # Serialize 'question_title' as 'questionTitle'
    created_at = ma.DateTime(data_key='createdDate', dump_only=True)  # Serialize 'created_at' as 'createdDate'
    updated_at = ma.DateTime(data_key='updatedDate', dump_only=True)  # Serialize 'updated_at' as 'updatedDate'

    class Meta:
       model = Problem # Specify the model
       include_fk = True # This includes foreign keys like difficulty_id
       load_instance = True # For deserializing into model instances

    difficulty = ma.Nested(DifficultySchema, dump_only=True)
    #solution = ma.Nested(ProblemSolutionSchema)
    solution = ma.List(ma.Nested(ProblemSolutionSchema, dump_only=True))

    @pre_load
    def process_difficulty(self, data, **kwargs):
        """Convert 'difficulty' name to 'difficulty_id'."""
        if "difficulty" in data and isinstance(data["difficulty"], str):
            try:
                difficulty = Difficulty.query.filter_by(level=data["difficulty"]).first()
                if not difficulty:
                    raise ValidationError(f"Difficulty '{data['difficulty']}' is not valid.")
                data["difficulty_id"] = difficulty.id  # Replace with the corresponding ID
                data.pop("difficulty", None)  # Remove the original 'difficulty' field
            except Exception as e:
                print(f"Error in difficulty processing: {e}")
                raise ValidationError(f"Error processing difficulty: {e}")
            
        return data
    
    @post_dump
    def process_difficulty_output(self, data, **kwargs):
        """Convert 'difficulty_id' to 'difficulty level' for output."""
        if "difficulty" in data:
            #data["difficulty"] = data["difficulty"]["level"]
            data["difficulty"] = data["difficulty"]
        
        if "difficulty_id" in data:
            data.pop("difficulty_id", None)  # Remove the original 'difficulty' field

        return data

# Manually
# class ProblemListSchema(ma.Schema):
#     id = ma.fields.Int(dump_only=True)
#     question = ma.fields.Str(required=True)
#     difficulty_id = ma.fields.Str(required=True)