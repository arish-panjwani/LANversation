
# LANversation Front-End 💬

This is the static frontend UI for **LANversation**, an encrypted LAN chat app.

---

## 🌐 Live Site

👉 [https://lanversation.netlify.app](https://lanversation.netlify.app)

---

## 🔐 Features

- End-to-end AES encryption via user-supplied key
- Group isolation using `SHA256(key)`
- Minimal dark UI (mobile-friendly)
- Built with: `HTML + CSS + JavaScript + CryptoJS`

---

## 🛠 Setup (Local)

```
bash
cd frontend
python -m http.server 5500
```

Then visit: http://localhost:5500

⚠️ Update script.js with your backend host:
```const host = "https://lanversation.onrender.com";```

---

## 🚀 Deployment (Netlify)
Connect repo → Select frontend as base and publish dir

Leave Build command blank (static)

Auto deploys on Git pushes to main
