import sqlite3

def init_db():
    conn = sqlite3.connect('prompthub.db')
    cursor = conn.cursor()

    # 1. USERS TABLE
    # Updated to include 'phone' and 'username' to match your Profile UI
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phone TEXT,
            username TEXT UNIQUE
        )
    ''')

    # 2. PROMPTS TABLE
    # Matches your CreatePrompt.jsx fields
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS prompts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            title TEXT NOT NULL,
            category TEXT,
            tone TEXT,
            generated_content TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')

    conn.commit()
    conn.close()
    print("Database tables initialized: Users (with Profile fields) and Prompts.")

if __name__ == '__main__':
    init_db()