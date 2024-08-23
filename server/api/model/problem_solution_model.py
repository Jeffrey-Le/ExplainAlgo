from app import db

class ProblemSolution(db.Model):
    __tablename__ = 'problem_solution'

    id = db.Column(db.Integer, primary_key=True)
    problem_id = db.Column(db.Integer, db.ForeignKey('problem.id'), nullable=False)
    solution_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    # Relationships
    problems = db.relationship('Problem', backref='problem_solution', lazy=True)

    def __repr__(self):
        return f'<ProblemSolution id={self.id} problem_id={self.problem_id} solution="{self.solution_text}">'
