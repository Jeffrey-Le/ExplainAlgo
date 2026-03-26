from flask import Blueprint, jsonify
from extensions import db
from sqlalchemy import text

health = Blueprint('health', __name__, url_prefix='/health')

@health.route('/', methods=['GET'])
def health_check():
    """
    Liveness + readiness check used by:
    - Kubernetes liveness/readiness probes
    - CI/CD smoke tests (cd-staging.yml, cd-prod.yml)
    - Load balancer health checks

    Returns 200 if the app + DB are reachable, 503 otherwise.
    """
    try:
        # Verify DB connection is live
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
