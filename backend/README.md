# LANversation Back-End 🔐

This is the Flask backend API for **LANversation**, a LAN-based encrypted chat platform.

---

## 🌐 Live API

👉 [https://lanversation.onrender.com](https://lanversation.onrender.com)

---

## 🛠 API Endpoints

| Route         | Method | Description                     |
|---------------|--------|---------------------------------|
| `/`           | GET    | Health check                    |
| `/send`       | POST   | Send encrypted message          |
| `/messages`   | GET    | Fetch all messages (frontend filters by key) |

---

## 🧠 How It Works

- Accepts `AES-encrypted` messages with a `SHA256` key hash
- Messages are stored in memory (non-persistent)
- Clients decrypt using their key
- Clients filter by matching key hash

---

## 🛠 Local Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Then visit: http://localhost:5050/messages

## 🚀 Deployment (Render)
Root Directory: backend

Build Command:
```
pip install -r requirements.txt
```

Start Command:

```
gunicorn app:app
```

