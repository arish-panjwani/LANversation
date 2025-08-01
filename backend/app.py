from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import pytz
import requests
import os

app = Flask(__name__)
CORS(app)

messages = []

# Use API_BASE_URL from .env or fallback to localhost for local testing
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:5050")

@app.route("/")
def home():
    return "LANversation server is running."

@app.route("/send", methods=["POST"])
def send_message():
    data = request.json

    edt = pytz.timezone("America/Toronto")
    now_edt = datetime.now(edt)

    messages.append({
        "user": data.get("user", "Anonymous"),
        "message": data.get("message", ""),
        "key_hash": data.get("key_hash", ""),
        "timestamp": now_edt.isoformat()
    })

    return jsonify(success=True)

@app.route("/ping", methods=["GET"])
def ping_proxy():

    edt = pytz.timezone("America/Toronto")
    now_edt = datetime.now(edt)

    try:
        response = requests.post(f"{API_BASE_URL}/send", json={
            "user": "Anonymous",
            "message": "It still works 🥳🥳",
            "key_hash": "lanversation-status-check",
            "timestamp": now_edt.isoformat()
        })
        return jsonify(success=True, forwarded_response=response.json())
    except Exception as e:
        return jsonify(success=False, error=str(e)), 500

@app.route("/messages", methods=["GET"])
def get_messages():
    return jsonify(messages)

@app.route("/clear", methods=["POST"])
def clear_messages():
    global messages
    messages = []
    return jsonify(success=True, message="All messages cleared.")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
