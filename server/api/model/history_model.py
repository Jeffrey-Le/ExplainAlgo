# from app import db
# from sqlalchemy.orm import relationship

# class History(db.Model):
#     __tablename__ = 'history'

#     id = db.Column(db.Integer, primary_key=True)
#     action = db.Column(db.String(100), nullable=False)
#     timestamp = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
#     problem_list_id = db.Column(db.Integer, db.ForeignKey('problem_lists.id'), nullable=False)

#     def __repr__(self):
#         return f'<History {self.id} - {self.action}>'
