from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import pytz

app = Flask(__name__)
CORS(app)

messages = []

@app.route("/")
def home():
    return "LANversation server is running."

@app.route("/send", methods=["POST"])
def send_message():
    data = request.json

    # Generate current EDT time with timezone offset
    edt = pytz.timezone("America/Toronto")
    now_edt = datetime.now(edt)

    messages.append({
        "user": data.get("user", "Anonymous"),
        "message": data.get("message", ""),
        "key_hash": data.get("key_hash", ""),
        "timestamp": now_edt.isoformat()
    })

    return jsonify(success=True)

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
