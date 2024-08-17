from extensions import db

class Type(db.Model):
    __tablename__ = 'type'

    id = db.Column(db.Integer, primary_key=True)
    type_name = db.Column(db.String(50), nullable=False, unique=True)  # e.g., Array, Dyanmic Programming

    # Define relationship to Problem
    # The 'backref' option in Problem will create a 'problems' attribute on the Type class
    #problems = db.relationship('Problem', backref='type', lazy=True)

    def __repr__(self):
        return f'<Type id={self.id} type_name="{self.type_name}">'
