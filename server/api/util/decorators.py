from functools import wraps
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask import jsonify, request
from api.model import User
from extensions import csrf

from functools import wraps
from flask_wtf.csrf import generate_csrf, CSRFError

# Custom CSRF decorator
def csrf_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Retrieve CSRF token from cookies
        csrf_token = request.cookies.get('csrf_token')


        # Retrieve CSRF token from the request header (you could use this as well if not using HttpOnly)
        # csrf_token_from_header = request.headers.get('X-CSRF-Token')

        # If token is missing, return 403 Forbidden
        if not csrf_token:
            return jsonify(message="CSRF token is missing"), 403
            

        # Validate the token using Flask-WTF's CSRF validation
        try:
            # Flask-WTF CSRF validation (compare cookie value with submitted form data or headers)
            generate_csrf()  # This will raise an error if the CSRF token is invalid
        except CSRFError:
            return jsonify(message="Invalid CSRF token"), 403

        # If token is valid, proceed with the request
        return f(*args, **kwargs)

    return decorated_function

def role_required(required_role):
    def wrapper(fn):
        @wraps(fn)
        @jwt_required(locations=['cookies'])
        def decorated_view(*args, **kwargs):
            # Check if JWT is present
            #jwt_required()(fn)
            print("Checking Role")

            current_user = get_jwt_identity()
            user = User.query.filter_by(id=current_user).first()

            print(user)
            print(required_role)

            if user and user.role == required_role:
                return fn(*args, **kwargs)
            else:
                return jsonify({"msg": "Access denied"}), 403
        return decorated_view
    return wrapper
