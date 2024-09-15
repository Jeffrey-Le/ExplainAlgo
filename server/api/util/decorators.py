from functools import wraps
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask import jsonify
from api.model import User

def role_required(required_role):
    def wrapper(fn):
        @wraps(fn)
        @jwt_required(locations=['cookies'])
        def decorated_view(*args, **kwargs):
            # Check if JWT is present
            #jwt_required()(fn)
            current_user = get_jwt_identity()
            user = User.query.filter_by(id=current_user).first()

            if user and user.role == required_role:
                return fn(*args, **kwargs)
            else:
                return jsonify({"msg": "Access denied"}), 403
        return decorated_view
    return wrapper
