from flask import Blueprint, request, jsonify
from api.schema import UserSchema
from api.model import User
from extensions import db
from marshmallow import ValidationError
from api.service.password_service import hash_password
from api.service.token_service import authenticate_user
from api.util.decorators import role_required

user = Blueprint('user_routes', __name__, url_prefix='/users')

@user.route('', methods=['GET'])
def get_user():
    return

@user.route('/add', methods=['POST'])
def add_user():
    return

@user.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    token = authenticate_user(username, password)
    if token:
        return jsonify(token), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@user.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    # Backend validation
    if not username or not password or not email:
        return jsonify({'message': 'Missing required fields'}), 400
    
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400
    
    hashed_password = hash_password(password)
    new_user = User(username=username, password_hash=hashed_password, email=email)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User created successfully'}), 201

@user.route('/admin/', methods=['GET'])
@role_required('admin')
def admin_dashboard():
    return jsonify({"msg": "Welcome to the admin dashboard!"})