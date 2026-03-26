from flask import Blueprint, jsonify
from extensions import db, limiter
from sqlalchemy import text

health = Blueprint('health', __name__, url_prefix='/health')

@health.route('/', methods=['GET'])
@limiter.exempt
def health_check():
    try:
        db.session.execute(text('SELECT 1'))
        return jsonify({
            "status": "ok",
            "database": "ok"
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "database": str(e)
        }), 503