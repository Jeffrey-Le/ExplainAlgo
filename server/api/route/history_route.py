from flask import Blueprint, request, jsonify
from api.schema import HistorySchema
from api.model import History

history = Blueprint('history_routes', __name__, url_prefix='/history')

@history.route('/all', methods=['GET'])
def get_history():
    history = History.query.all()
    schema = HistorySchema(many=True)
    result = schema.dump(history)

    return jsonify(result), 200