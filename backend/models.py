from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# Initialize extensions
db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Hashed password
    username = db.Column(db.String(50), unique=True, nullable=True)
    phone = db.Column(db.String(20), nullable=True)

    # Relationship: One user can have many prompts
    prompts = db.relationship('Prompt', backref='creator', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<User {self.name}>'

class Prompt(db.Model):
    __tablename__ = 'prompts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    tone = db.Column(db.String(50), nullable=False)
    
    # Structured Prompt Fields
    role = db.Column(db.String(100), nullable=True)
    context = db.Column(db.Text, nullable=True)
    task = db.Column(db.Text, nullable=True)
    constraints = db.Column(db.Text, nullable=True)
    output_format = db.Column(db.String(100), nullable=True)
    
    # Final generated content from AI
    generated_content = db.Column(db.Text, nullable=False)
    
    # Foreign Key to link prompt to a specific user
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f'<Prompt {self.title}>'

class Template(db.Model):
    __tablename__ = 'templates'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    tone = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(100), nullable=True)
    task = db.Column(db.Text, nullable=True)
    content = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<Template {self.title}>'