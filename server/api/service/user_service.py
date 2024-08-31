from flask_jwt_extended import get_jwt_identity, jwt_required

from api.model import User

def get_user_by_id(user_id):
    cur_user = User.query.filter_by(id=user_id).first()
    print(cur_user)
    return cur_user

@jwt_required()
def get_current_user():
    """Get the current user based on the token."""
    return get_jwt_identity()