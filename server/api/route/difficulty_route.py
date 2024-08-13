from flask import Blueprint, request, jsonify
from api.schema import DifficultySchema
from api.model import Difficulty

difficulty = Blueprint('difficulty_routes', __name__, url_prefix='/difficulties')

@difficulty.route('/all', methods=['GET'])
def get_all_difficulties():
    difficulties = Difficulty.query.all()
    schema = DifficultySchema(many=True)
    result = schema.dump(difficulties)

    return jsonify(result), 200

# @difficulty.route('', methods=['POST'])
# def add_difficulty():
#     schema = DifficultySchema()
#     try:
#         difficulty_data = schema.load(request.get_json(), session=db.session)
#         db.session.add(difficulty_data)
#         db.session.commit()
#         return schema.jsonify(difficulty_data), 201
#     except ValidationError as err:
#         return jsonify(err.messages), 400

# @difficulty.route('/<int:id>', methods=['GET'])
# def get_difficulty(id):
#     difficulty = Difficulty.query.get_or_404(id)
#     schema = DifficultySchema()
#     return schema.jsonify(difficulty)
