from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_wtf.csrf import generate_csrf

from extensions import db, logger, limiter

from api.schema import UserSchema
from api.model import User
from api.service.password_service import hash_password
from api.service.token_service import authenticate_user
from api.service.validate_service import send_verification_email, validate_password, validate_email
from api.service.user_service import get_user_by_id
from api.util.decorators import role_required

user = Blueprint('user_routes', __name__, url_prefix='/users')

@user.route('/csrf-token', methods=['GET'])
def get_csrf_token():
    token = generate_csrf()
    response = jsonify({'csrf_token': token})
    response.set_cookie('csrf_token', token, path='/', httponly=True)
    return response

@user.route('/', methods=['GET'])
@jwt_required(locations=['cookies'])
def get_user():
    #token = request.cookies.get('access_token')
    user_id = get_jwt_identity()
    if user_id:
        # Validate the token and proceed
        user = get_user_by_id(user_id)

        schema = UserSchema()
        result = schema.dump(user)

        return jsonify(result), 200
    else:
        return jsonify({'message': 'No User found'}), 401

@user.route('/add', methods=['POST'])
def add_user():
    return

@user.route('/login', methods=['POST'])
@limiter.limit("10 per minute") # Limit to 10 requests per minute
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    logger.info(f'Login attempt for username: {username}')

    #get_csrf_token()
    
    token = authenticate_user(username, password)

    if token:
        response = make_response(jsonify({'message': 'Login Successful!'}))
        response.set_cookie('access_token', token['access_token'], httponly=True, secure=True, samesite='Lax')
        return response, 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@user.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')
    email = data.get('email')

    logger.info(f'Registration attempt for new User')

    # Backend validation
    if not username or not password or not email or not confirm_password:
        return jsonify({'message': 'Missing required fields'}), 400
    
    if len(username) < 4:
        return jsonify({'message': 'Username must be at least 4 characters long'}), 400
    
    if len(password) < 8:
        return jsonify({'message': 'Password must be at least 8 characters long'}), 400
    
    password_error = validate_password(password)
    if password_error:
        return jsonify({'message': password_error}), 400
    
    email_error = validate_email(email)
    if email_error:
        return jsonify({'message': email_error}), 400
    
    if password != confirm_password:
        return jsonify({'message': 'Passwords do not match'}), 400
    
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400
    
    hashed_password = hash_password(password)
    new_user = User(username=username, password_hash=hashed_password, email=email)
    db.session.add(new_user)
    db.session.commit()

    # Optionally send verification email
    verification_link = f"https://example.com/verify/{new_user.id}"
    send_verification_email(email, verification_link)
    
    return jsonify({'message': 'User created successfully. Please verify your email to complete registration.'}), 201

@user.route('/protected', methods=['GET'])
def protected():
    token = request.cookies.get('access_token')
    if token:
        # Validate the token and proceed
        return jsonify({'message': 'Token received'}), 200
    else:
        return jsonify({'message': 'No token found'}), 401


@user.route('/admin/', methods=['GET'])
@role_required('admin')
def admin_dashboard():
    csrf_header = request.headers.get('X-CSRF-Token')
    csrf_cookie = request.cookies.get('csrf_token')
    print(f"CSRF Header: {csrf_header}")
    print(f"CSRF Cookie: {csrf_cookie}")
    
    if csrf_header == csrf_cookie:
        return jsonify({"msg": "Welcome to the admin dashboard! The same tokens!"})
    else:
        return jsonify({"msg": "Welcome to the admin dashboard! Not the same tokens!"})