# backend/app.py
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask, jsonify, request
from database.database import get_db_connection, init_db

app = Flask(__name__)

# Initialize the database
with app.app_context():
    init_db()

@app.route('/attendance', methods=['GET'])
def get_attendance():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM attendance')
    records = cursor.fetchall()
    return jsonify([dict(row) for row in records])

@app.route('/attendance', methods=['POST'])
def add_attendance():
    data = request.get_json()
    name = data.get('name')
    if not name:
        return jsonify({'error': 'Name is required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO attendance (name) VALUES (?)', (name,))
    conn.commit()
    return jsonify({'message': 'Attendance added successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True, threaded=False, use_reloader=False)
