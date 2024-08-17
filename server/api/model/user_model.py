from extensions import db

from datetime import datetime

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)  # For storing hashed passwords
    role = db.Column(db.String(20), default='user') # 'user' or 'admin
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    # Relationship to History
    historyR = db.relationship('History', backref='user', lazy=True)

    def __repr__(self):
        return f'<User id={self.id} username="{self.username}">'