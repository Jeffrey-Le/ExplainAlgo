from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)
# # Replace placeholders with your actual credentials
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://USERNAME:PASSWORD@PUBLIC_IP/DATABASE_NAME'  
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Optional, but saves resources
# db = SQLAlchemy(app)
# # Define your database model (example)
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     def __repr__(self):
#         return '<Users %r>' % self.id
# # ... rest of your Flask application logic ...
# # Query all rows from the Users table
# all_messages = Users.query.all()
# # Store row in database
# new_response = Users(username=username, email=email)
# db.session.add( new_response)
# db.session.commit()

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"