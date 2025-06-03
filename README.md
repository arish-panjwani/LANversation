# LANversation 🔐💬

LANversation is a lightweight, encrypted LAN chat app that supports **group-based conversations** through a shared key. It's ideal for classrooms, team discussions, or temporary collaboration — all over the same network or internet.

---

## 🚀 Live Demo

- **Frontend (Netlify):** [https://lanversation.netlify.app](https://lanversation.netlify.app)
- **Backend (Render):** [https://lanversation.onrender.com](https://lanversation.onrender.com)

---

## ⚙️ Features

- 🔑 AES-encrypted chat via user-shared key
- 🔒 Scoped messages by key hash (group isolation)
- 💻 Simple, responsive dark UI
- 🧠 No login/signup — just enter name + key
- 🔁 Live chat with 1-second polling

---

## 🛠 Tech Stack

| Layer     | Tech                  |
|-----------|------------------------|
| Frontend  | HTML, CSS, JS, CryptoJS |
| Backend   | Flask, Flask-CORS      |
| Hosting   | Netlify (FE), Render (BE) |

---

## 📁 Project Structure

LANversation/
├── backend/ # Flask API
├── frontend/ # Encrypted dark mode chat UI
└── README.md # Project overview

---

## 📦 Setup (Local)

### 🖥 Backend (Flask)
```
bash
cd backend
pip install -r requirements.txt
python app.py
```

### 🌐 Backend (Flask)
Open frontend/index.html in a browser or run:
```
cd frontend
python -m http.server
```

⚠️ Make sure the script.js file has the correct backend URL (https://lanversation.onrender.com)

👥 Team
Created by Arish Panjwani
