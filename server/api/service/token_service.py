from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.model.user_model import User  # Your user model
from api.service.password_service import verify_password

def authenticate_user(username: str, password: str):
    """Authenticate a user and return a token if successful."""
    user = User.query.filter_by(username=username).first()
    if user and verify_password(user.password_hash, password):
        access_token = create_access_token(identity=user.id)
        return {'access_token': access_token}
    else:
        return None
