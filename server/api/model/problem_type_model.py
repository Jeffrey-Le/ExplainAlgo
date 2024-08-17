from extensions import db

class ProblemType(db.Model):
    __tablename__ = 'problem_type'

    problem_id = db.Column(db.Integer, db.ForeignKey('problem.id'), nullable=False, primary_key=True)
    type_id = db.Column(db.Integer, db.ForeignKey('type.id'), nullable=False, primary_key=True)

    # Define relationship to ProblemList
    # The 'backref' option in ProblemList will create a 'problems' attribute on the Difficulty class
    problems = db.relationship('Problem', backref='problem_type', lazy=True)
    types = db.relationship('Type', backref='problem_type', lazy=True)

    def __repr__(self):
        return f'<problem_id={self.problem_id} type_id={self.type_id}>'
