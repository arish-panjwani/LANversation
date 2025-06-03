from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

messages = []

@app.route("/")
def home():
    return "LANversation server is running."

@app.route("/send", methods=["POST"])
def send_message():
    data = request.json
    messages.append({
        "user": data.get("user", "Anonymous"),
        "message": data.get("message", ""),
        "key_hash": data.get("key_hash", ""),
        "timestamp": datetime.now().strftime("%H:%M:%S")
    })
    return jsonify(success=True)

@app.route("/messages", methods=["GET"])
def get_messages():
    return jsonify(messages)

if __name__ == "__main__":
    app.run(host="10.111.66.138", port=5050, debug=True)


@app.route("/clear", methods=["POST"])
def clear_messages():
    global messages
    messages = []
    return jsonify(success=True, message="All messages cleared.")
