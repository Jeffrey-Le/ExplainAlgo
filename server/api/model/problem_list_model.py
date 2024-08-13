from extensions import db

class ProblemList(db.Model):
    __tablename__ = 'problem_list'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(100), nullable=False)
    difficulty_id = db.Column(db.Integer, db.ForeignKey('difficulty.id'), nullable=False)

    # Optional __init__ method
    # def __init__(self, url, result_all, result_no_stop_words):
    #     self.url = url
    #     self.result_all = result_all
    #     self.result_no_stop_words = result_no_stop_words

    # Example of a relationship if you have individual problems in a separate table
    difficultyR = db.relationship('Difficulty', backref='problem_list', lazy=True)

    def __repr__(self):
        return f'<ProblemList id={self.id} question="{self.question}" difficulty_id={self.difficulty_id}>'
