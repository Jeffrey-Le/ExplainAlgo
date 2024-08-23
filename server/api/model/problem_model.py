from extensions import db

class Problem(db.Model):
    __tablename__ = 'problem'

    id = db.Column(db.Integer, primary_key=True)
    question_title = db.Column(db.String(100), nullable=False)
    question = db.Column(db.Text, nullable=False)
    difficulty_id = db.Column(db.Integer, db.ForeignKey('difficulty.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    # Optional __init__ method
    # def __init__(self, url, result_all, result_no_stop_words):
    #     self.url = url
    #     self.result_all = result_all
    #     self.result_no_stop_words = result_no_stop_words

    # Relationships
    # Example of a relationship if you have individual problems in a separate table
    difficulty = db.relationship('Difficulty', backref='problem', lazy=True)
    solution = db.relationship('ProblemSolution', backref='problem', lazy=True)
    types = db.relationship('Type', secondary='problem_type', lazy='subquery',
                            backref=db.backref('problem', lazy=True))

    def __repr__(self):
        return f'<Problem id={self.id} question_title="{self.question_title}" question="{self.question}" difficulty_id={self.difficulty_id}>'
