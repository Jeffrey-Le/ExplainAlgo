# from app import db
# from sqlalchemy.orm import relationship

# class ProblemSolution(db.Model):
#     __tablename__ = 'problem_solution'

#     id = db.Column(db.Integer, primary_key=True)
#     solution_text = db.Column(db.Text, nullable=False)
#     problem_list_id = db.Column(db.Integer, db.ForeignKey('problem_lists.id'), nullable=False)

#     def __repr__(self):
#         return f'<ProblemSolution {self.id}>'
