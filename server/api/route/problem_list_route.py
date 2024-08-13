from flask import Blueprint, request, jsonify
from api.schema import ProblemListSchema
from api.model import ProblemList

problem_list = Blueprint('problem_routes', __name__, url_prefix='/problems')

# @problem_list.route('', methods=['POST'])
# def add_problem():
#     schema = ProblemListSchema()
#     try:
#         problem_data = schema.load(request.get_json(), session=db.session)
#         db.session.add(problem_data)
#         db.session.commit()
#         return schema.jsonify(problem_data), 201
#     except ValidationError as err:
#         return jsonify(err.messages), 400

# @problem_list.route('/<int:id>', methods=['GET'])
# def get_problem(id):
#     problem = ProblemList.query.get_or_404(id)
#     schema = ProblemListSchema()
#     return schema.jsonify(problem)
