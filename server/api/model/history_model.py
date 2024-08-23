from app import db

class History(db.Model):
    __tablename__ = 'history'

    id = db.Column(db.Integer, primary_key=True)
    problem_id = db.Column(db.Integer, db.ForeignKey('problem.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    solution_id = db.Column(db.Integer, db.ForeignKey('problem_solution.id'))
    solved_at = db.Column(db.DateTime, default=db.func.now())
    status = db.Column(db.String(50), nullable=False)  # e.g., 'solved', 'attempted'

    # Relationships
    problem = db.relationship('Problem', backref='history')
    cur_user = db.relationship('User', backref='history')
    solution = db.relationship('ProblemSolution', backref='history')

    def __repr__(self):
        return f'<History id={self.id} problem_id={self.problem_id} user_id={self.user_id} solved_at={self.solved_at}>'
