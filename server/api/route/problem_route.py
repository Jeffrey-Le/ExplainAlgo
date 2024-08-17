from flask import Blueprint, request, jsonify
from api.schema import ProblemSchema
from api.model import Problem
from extensions import db
from marshmallow import ValidationError

problem = Blueprint('problem_routes', __name__, url_prefix='/problems')

@problem.route('/', methods=['GET'])
def get_problems():
    quantity = request.args.get('quantity', type=int)

    if quantity: # If quanity exists, will query x number of Problems
        problems = Problem.query.limit(quantity).all()
    else: # Queries all Problems
        problems = Problem.query.all()

    schema = ProblemSchema(many=True)
    result = schema.dump(problems)

    return jsonify(result), 200

@problem.route('/add', methods=['POST'])
def add_problem():
    schema = ProblemSchema()
    try:
        problem_data = schema.load(request.get_json(), session=db.session)
        db.session.add(problem_data)
        db.session.commit()
        return schema.jsonify(problem_data), 201
    except ValidationError as err:
        return jsonify(err.messages), 400

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
