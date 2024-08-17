from extensions import db

class Difficulty(db.Model):
    __tablename__ = 'difficulty'

    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.String(10), nullable=False, unique=True)  # e.g., Easy, Medium, Hard

    # Define relationship to ProblemList
    # The 'backref' option in ProblemList will create a 'problems' attribute on the Difficulty class
    #problems = db.relationship('Problem', backref='difficulty', lazy=True)

    def __repr__(self):
        return f'<Difficulty id={self.id} level="{self.level}">'
