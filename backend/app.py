import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, bcrypt, User, Prompt, Template
from groq import Groq
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///prompthub_v2.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key_here'

# GROQ API — loaded from .env
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY)

# Initialize Extensions
db.init_app(app)
bcrypt.init_app(app)
CORS(app)

with app.app_context():
    db.create_all()

# CATEGORY MANAGEMENT
CATEGORIES_FILE = 'categories.json'

def load_categories():
    if not os.path.exists(CATEGORIES_FILE):
        defaults = ["Writing", "Coding", "Marketing", "Career", "Study Help", "Blog"]
        with open(CATEGORIES_FILE, 'w') as f:
            json.dump(defaults, f)
        return defaults
    try:
        with open(CATEGORIES_FILE, 'r') as f:
            return json.load(f)
    except:
        return []

def save_categories(cats):
    with open(CATEGORIES_FILE, 'w') as f:
        json.dump(cats, f)

# TONE MANAGEMENT
TONES_FILE = 'tones.json'

def load_tones():
    if not os.path.exists(TONES_FILE):
        defaults = ["Formal", "Casual", "Professional", "Friendly", "Creative", "Technical"]
        with open(TONES_FILE, 'w') as f:
            json.dump(defaults, f)
        return defaults
    try:
        with open(TONES_FILE, 'r') as f:
            return json.load(f)
    except:
        return []

def save_tones(tones):
    with open(TONES_FILE, 'w') as f:
        json.dump(tones, f)

# USER AUTHENTICATION

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    new_user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json

    user = User.query.filter_by(email=data['email']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({
            "user_id": user.id,
            "name": user.name,
            "email": user.email
        }), 200

    return jsonify({"error": "Invalid email or password"}), 401


# PROFILE

@app.route('/api/user/<int:user_id>', methods=['GET', 'PUT'])
def handle_profile(user_id):

    user = User.query.get_or_404(user_id)

    if request.method == 'GET':

        prompt_count = Prompt.query.filter_by(user_id=user_id).count()

        return jsonify({
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "username": user.username,
            "prompt_count": prompt_count
        })

    if request.method == 'PUT':

        data = request.json

        user.name = data.get('name', user.name)
        user.username = data.get('username', user.username)
        user.phone = data.get('phone', user.phone)

        db.session.commit()

        return jsonify({"message": "Profile updated"})


# DASHBOARD

@app.route('/api/dashboard/<int:user_id>', methods=['GET'])
def get_dashboard(user_id):

    try:

        prompt_count = Prompt.query.filter_by(user_id=user_id).count()

        user_prompts = Prompt.query.filter_by(user_id=user_id).all()
        categories_used = len(set(p.category for p in user_prompts if p.category))

        total_categories = len(load_categories())

        recent_prompts = (
            Prompt.query
            .filter_by(user_id=user_id)
            .order_by(Prompt.id.desc())
            .limit(3)
            .all()
        )

        return jsonify({
            "prompt_count": prompt_count,
            "categories_used": categories_used,
            "total_categories": total_categories,
            "recent_prompts": [
                {
                    "id": p.id,
                    "title": p.title,
                    "category": p.category,
                    "tone": p.tone,
                    "generated_content": p.generated_content
                }
                for p in recent_prompts
            ]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# CATEGORY ROUTES

@app.route('/api/categories', methods=['GET', 'POST'])
def manage_categories():

    if request.method == 'GET':
        return jsonify(load_categories())

    data = request.json
    new_cat = data.get('name')

    cats = load_categories()

    if new_cat not in cats:
        cats.append(new_cat)
        save_categories(cats)
        return jsonify({"message": "Added", "categories": cats})

    return jsonify({"error": "Category already exists"}), 400


@app.route('/api/categories/<string:name>', methods=['DELETE'])
def delete_category(name):

    cats = load_categories()

    if name in cats:
        cats.remove(name)
        save_categories(cats)
        return jsonify({"message": "Deleted", "categories": cats})

    return jsonify({"error": "Not found"}), 404


# TONE ROUTES

@app.route('/api/tones', methods=['GET', 'POST'])
def manage_tones():

    if request.method == 'GET':
        return jsonify(load_tones())

    data = request.json
    new_tone = data.get('name')

    tones = load_tones()

    if new_tone not in tones:
        tones.append(new_tone)
        save_tones(tones)
        return jsonify({"message": "Added", "tones": tones})

    return jsonify({"error": "Tone already exists"}), 400


@app.route('/api/tones/<string:name>', methods=['DELETE'])
def delete_tone(name):

    tones = load_tones()

    if name in tones:
        tones.remove(name)
        save_tones(tones)
        return jsonify({"message": "Deleted", "tones": tones})

    return jsonify({"error": "Not found"}), 404


# AI PROMPT GENERATION

@app.route('/api/generate-prompt', methods=['POST'])
def generate_prompt_ai():

    data = request.json

    topic         = (data.get('topic') or data.get('title') or '').strip()
    role          = (data.get('role') or '').strip()
    task          = (data.get('task') or '').strip()
    context       = (data.get('context') or '').strip()
    tone          = (data.get('tone') or 'Professional').strip()
    constraints   = (data.get('constraints') or '').strip()
    output_format = (data.get('output_format') or '').strip()

    if not topic and not task:
        return jsonify({"error": "Please provide at least a topic or task."}), 400

    system_message = """You are an expert Prompt Engineer. Your sole job is to write high-quality, 
structured AI prompts that users can copy and paste directly into any AI chatbot (like ChatGPT or Claude).

STRICT RULES you must always follow:
- Write the prompt entirely from the USER's point of view, as if they are speaking to an AI.
- ALWAYS start with: "Act as a [role]..."
- Do NOT use any placeholders like [Insert X] or <your topic here>. Fill everything in using the provided inputs.
- Do NOT roleplay as the AI. Never write "Hi, I am here to help" or start with "Sure!" or "Of course!".
- Do NOT explain what you are doing. Output ONLY the final prompt text, nothing else.
- Do NOT wrap output in quotes or markdown code blocks.
- The prompt must be clear, specific, actionable, and immediately usable."""

    filled_fields = f"""Use these inputs to build the prompt:
- Expert Role the AI should play: {role if role else 'a knowledgeable expert on the topic'}
- Subject / Topic: {topic if topic else 'as implied by the task'}
- Core Task the user needs done: {task if task else 'provide a thorough explanation and actionable insights'}
- Desired Tone: {tone}"""

    if context:
        filled_fields += f"\n- Important Context to consider: {context}"
    if constraints:
        filled_fields += f"\n- Constraints to respect: {constraints}"
    if output_format:
        filled_fields += f"\n- Required Output Format: {output_format}"

    user_message = f"""{filled_fields}

Now write a single, complete, copy-pasteable AI prompt using ALL the above inputs naturally.
The prompt should feel like a real instruction written by a professional, not a filled template.
Do not add any explanation, preamble, or closing remark — output only the prompt itself."""

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user",   "content": user_message}
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.5,
            max_tokens=400
        )

        generated_prompt = chat_completion.choices[0].message.content.strip()

        if generated_prompt.startswith('"') and generated_prompt.endswith('"'):
            generated_prompt = generated_prompt[1:-1]

        if generated_prompt.startswith("```"):
            lines = generated_prompt.splitlines()
            generated_prompt = "\n".join(
                line for line in lines if not line.strip().startswith("```")
            ).strip()

        if not generated_prompt.lower().startswith("act as"):
            generated_prompt = f"Act as a {role if role else 'knowledgeable expert'}. " + generated_prompt

        return jsonify({"generated_prompt": generated_prompt}), 200

    except Exception as e:
        print("AI Generation Error:", e)
        return jsonify({"error": "AI service is currently unavailable. Please try again."}), 500


# PROMPT STORAGE

@app.route('/api/prompts', methods=['POST'])
def save_prompt():

    data = request.json

    try:

        new_prompt = Prompt(
            title=data.get('title'),
            category=data.get('category'),
            tone=data.get('tone'),
            role=data.get('role'),
            context=data.get('context'),
            task=data.get('task'),
            constraints=data.get('constraints'),
            output_format=data.get('output_format'),
            generated_content=data.get('generated_content'),
            user_id=data.get('user_id')
        )

        db.session.add(new_prompt)
        db.session.commit()

        return jsonify({
            "message": "Prompt saved successfully!",
            "id": new_prompt.id
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/prompts/<int:user_id>', methods=['GET'])
def get_user_prompts(user_id):

    prompts = Prompt.query.filter_by(user_id=user_id).all()

    return jsonify([
        {
            "id": p.id,
            "title": p.title,
            "category": p.category,
            "tone": p.tone,
            "role": p.role,
            "generated_content": p.generated_content
        }
        for p in prompts
    ])


@app.route('/api/prompts/<int:prompt_id>', methods=['DELETE'])
def delete_prompt(prompt_id):

    prompt = Prompt.query.get_or_404(prompt_id)

    db.session.delete(prompt)
    db.session.commit()

    return jsonify({"message": "Prompt deleted"})


# TEMPLATE ROUTES

@app.route('/api/templates', methods=['GET'])
def get_templates():
    templates = Template.query.all()
    return jsonify([
        {
            "id": t.id,
            "title": t.title,
            "category": t.category,
            "tone": t.tone,
            "role": t.role,
            "task": t.task,
            "content": t.content
        }
        for t in templates
    ])


@app.route('/api/templates', methods=['POST'])
def add_template():
    data = request.json
    try:
        new_template = Template(
            title=data.get('title'),
            category=data.get('category'),
            tone=data.get('tone'),
            role=data.get('role'),
            task=data.get('task'),
            content=data.get('content')
        )
        db.session.add(new_template)
        db.session.commit()
        return jsonify({"message": "Template added successfully", "id": new_template.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/templates/<int:template_id>', methods=['DELETE'])
def delete_template(template_id):
    template = Template.query.get_or_404(template_id)
    db.session.delete(template)
    db.session.commit()
    return jsonify({"message": "Template deleted"}), 200


# ADMIN ROUTES

@app.route('/api/admin/stats', methods=['GET'])
def get_admin_stats():

    total_users = User.query.count()
    total_prompts = Prompt.query.count()

    return jsonify({
        "total_users": total_users,
        "total_prompts": total_prompts,
        "active_sessions": 1
    })


@app.route('/api/admin/users', methods=['GET'])
def get_all_users():

    users = User.query.all()

    return jsonify([
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "username": u.username,
            "phone": u.phone
        }
        for u in users
    ])


@app.route('/api/admin/users/<int:user_id>', methods=['DELETE'])
def delete_user_admin(user_id):

    try:

        user = User.query.get_or_404(user_id)

        Prompt.query.filter_by(user_id=user_id).delete()

        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": "User and their data deleted"}), 200

    except Exception as e:

        db.session.rollback()

        return jsonify({"error": str(e)}), 500


@app.route('/api/admin/prompts', methods=['GET'])
def get_all_prompts():

    prompts = Prompt.query.all()

    return jsonify([
        {
            "id": p.id,
            "title": p.title,
            "category": p.category,
            "tone": p.tone,
            "generated_content": p.generated_content,
            "creator_name": User.query.get(p.user_id).name if User.query.get(p.user_id) else "Unknown"
        }
        for p in prompts
    ])


if __name__ == '__main__':
    app.run(debug=True, port=5000)