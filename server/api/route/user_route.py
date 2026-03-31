from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_wtf.csrf import generate_csrf
from extensions import db, logger, limiter, csrf
from api.schema import UserSchema
from api.model import User
from api.service.password_service import hash_password
from api.service.token_service import authenticate_user
from api.service.validate_service import validate_password, validate_email
from api.service.email_service import send_verification_email
from api.service.user_service import get_user_by_id
from api.util.decorators import role_required

import secrets
import os

user = Blueprint('user_routes', __name__, url_prefix='/api/users')

@user.route('/csrf-token', methods=['GET'])
def get_csrf_token():
    token = generate_csrf()
    response = jsonify({'csrf_token': token})
    response.set_cookie('csrf_token', token, path='/', samesite='Strict', secure=True)
    return response

@user.route('/', methods=['GET'])
@jwt_required(locations=['cookies'])
def get_user():
    user_id = get_jwt_identity()
    if user_id:
        user = get_user_by_id(user_id)
        schema = UserSchema()
        result = schema.dump(user)
        return jsonify(result), 200
    else:
        return jsonify({'message': 'No User found'}), 401

@user.route('/login', methods=['POST'])
@limiter.limit("10 per minute")
@csrf.exempt
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    logger.info(f'Login attempt for username: {username}')

    # Check user exists and is verified before authenticating
    existing_user = User.query.filter_by(username=username).first()
    if existing_user and not existing_user.is_verified:
        return jsonify({'message': 'Please verify your email before logging in. Check your inbox for the verification link.'}), 403

    token = authenticate_user(username, password)

    if not token:
        return jsonify({'message': 'Invalid credentials'}), 401

    token['csrf_token'] = generate_csrf()
    user = User.query.filter_by(username=username).first()
    schema = UserSchema()
    result = schema.dump(user)
    response = make_response(jsonify({'message': 'Login Successful!', 'user': result}))
    response.set_cookie('access_token', token['access_token'], httponly=True, secure=False, samesite='Lax', max_age=3600)
    response.set_cookie('csrf_token', token['csrf_token'], httponly=True, samesite='Lax', secure=False, path='/')
    return response, 200

@user.route('/register', methods=['POST'])
@csrf.exempt
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')
    email = data.get('email')

    logger.info('Registration attempt for new User')

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

    # Generate verification token
    verification_token = secrets.token_urlsafe(32)

    hashed_password = hash_password(password)
    new_user = User(
        username=username,
        password_hash=hashed_password,
        email=email,
        is_verified=False,
        verification_token=verification_token
    )
    db.session.add(new_user)
    db.session.commit()

    # Send verification email
    base_url = os.getenv('BASE_URL', 'http://localhost:3000')
    verification_link = f"{base_url}/api/users/verify/{verification_token}"

    email_sent = send_verification_email(email, verification_link)
    if not email_sent:
        logger.warning(f'Failed to send verification email to {email}')

    return jsonify({
        'message': 'Registration successful. Please check your email to verify your account.'
    }), 201

@user.route('/verify/<token>', methods=['GET'])
def verify_email(token):
    user = User.query.filter_by(verification_token=token).first()

    if not user:
        return jsonify({'message': 'Invalid or expired verification link'}), 400

    if user.is_verified:
        return jsonify({'message': 'Email already verified. You can log in.'}), 200

    user.is_verified = True
    user.verification_token = None  # invalidate token after use
    db.session.commit()

    # Redirect to login page
    base_url = os.getenv('BASE_URL', 'http://localhost:3000')
    from flask import redirect
    return redirect(f"{base_url}/login?verified=true")

@user.route('/logout', methods=['POST'])
def logout():
    response = make_response(jsonify({'message': 'Logged Out!'}))
    response.delete_cookie('access_token')
    response.delete_cookie('csrf_token')
    response.delete_cookie('flask_session')
    return response

@user.route('/protected', methods=['GET'])
def protected():
    token = request.cookies.get('access_token')
    if token:
        return jsonify({'message': 'Token received'}), 200
    else:
        return jsonify({'message': 'No token found'}), 401

@user.route('/admin/', methods=['GET'])
@role_required('admin')
def admin_dashboard():
    return jsonify({"msg": "Welcome to the admin dashboard!"})