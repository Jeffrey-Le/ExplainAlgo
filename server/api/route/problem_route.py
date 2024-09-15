from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from flask_wtf.csrf import generate_csrf

import json
from marshmallow import ValidationError

from api.schema import ProblemSchema
from api.model import Problem
from extensions import db, csrf, gem

from api.util.decorators import role_required

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
@role_required('admin')
def add_problem():
    schema = ProblemSchema()
    try:
        problem_data = schema.load(request.get_json(), session=db.session)
        db.session.add(problem_data)
        db.session.commit()
        return schema.jsonify(problem_data), 201
    except ValidationError as err:
        return jsonify(err.messages), 400
    
@problem.route('/create', methods=['POST'])
@csrf.exempt
@role_required('admin')
def create_problem():
    global gem

    act = request.args.get('act', type=int)

    try :
        prompt = data.get('Prompt')
        match act:
            case 1:
                new_problem = gem['problem_generator'].generate_problems(prompt)
                return jsonify(new_problem), 201
            case 2:
                problem = data.get('Problem')
                new_solution = gem['problem_generator'].generate_solutions(problem)
                return jsonify(new_solution), 201
            case 3:
                solution = data.get('Solution')
                new_rubric = gem['problem_generator'].build_rubric(solution)
                return jsonify(new_rubric), 201
            case _:
                jsonify("Please resend the request with a response type (new, solution, rubric)"), 401
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
