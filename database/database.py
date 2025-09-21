# database/database.py
import sqlite3

_conn = None

def get_db_connection():
    global _conn
    if _conn is None:
        _conn = sqlite3.connect(':memory:')
        _conn.row_factory = sqlite3.Row
    return _conn

def init_db():
    conn = get_db_connection()
    with open('database/schema.sql', 'r') as f:
        conn.executescript(f.read())
    conn.commit()
