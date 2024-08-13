

# # Define Route First
# user_schema = UserSchema()

# # Then the Route
# @app.route("/user/details/<user_id>", method='GET')
# def get_user_details(user_id):
#     user = User.query.filter_by(id=user_id).first()
#     if user is None:
#         response = {
#                  'message': 'user does not exist'
#                    }
#         return jsonify(response), 404
#    result = user_schema.dumps(user).data
#    response= {
#             'data': result,
#             'status_code' : 202
#              }
#    return jsonify(response)