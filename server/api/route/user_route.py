from flask import Blueprint, request, jsonify, make_response

from extensions import db, logger, limiter

from api.schema import UserSchema
from api.model import User
from api.service.password_service import hash_password
from api.service.token_service import authenticate_user
from api.service.validate_service import send_verification_email, validate_password, validate_email
from api.util.decorators import role_required

user = Blueprint('user_routes', __name__, url_prefix='/users')

@user.route('', methods=['GET'])
def get_user():
    return

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
    return jsonify({"msg": "Welcome to the admin dashboard!"})