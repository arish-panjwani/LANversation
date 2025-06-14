const host = "https://lanversation.onrender.com"

function getKey() {
  return document.getElementById("key").value.trim();
}

function getKeyHash() {
  return CryptoJS.SHA256(getKey()).toString();
}

function encryptMessage(text) {
  return CryptoJS.AES.encrypt(text, getKey()).toString();
}

function decryptMessage(encrypted) {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, getKey());
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return "[Decryption failed]";
  }
}

async function sendMessage() {
  const user = document.getElementById("username").value || getRandomAnonymousName();
  const key = getKey();
  const message = document.getElementById("message").value.trim();

  if (!message || !key) return alert("Message and key are required.");

  await fetch(`${host}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user,
      key_hash: getKeyHash(),
      message: encryptMessage(message)
    })
  });

  document.getElementById("message").value = "";
}

function getRandomAnonymousName() {
  const animals = [
    "CleverFox",
    "BraveLion",
    "SilentOwl",
    "SwiftFalcon",
    "MightyBear",
    "SneakySnake",
    "HappyPanda",
    "WiseTurtle",
    "QuickRabbit",
    "GentleDolphin"
  ];
  
  const randomIndex = Math.floor(Math.random() * animals.length);
  return animals[randomIndex];
}

function sendPing() {
  const user = document.getElementById("username").value || getRandomAnonymousName();
  console.log(user)
  const key = getKey();

  if (!key) return alert("Encryption key is required for pinging.");

  fetch(`${host}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user,
      key_hash: getKeyHash(),
      message: encryptMessage("✋"), // Sending ✋ as the ping
    })
  });
}

async function fetchMessages() {
  const res = await fetch(`${host}/messages`);
  const data = await res.json();
  const keyHash = getKeyHash();
  const chatBox = document.getElementById("chatBox");

  chatBox.innerHTML = data
    .filter(m => m.key_hash === keyHash)
    .reverse()
    .map(m => {
      const decrypted = decryptMessage(m.message);
      const isPing = decrypted === "✋";
      if (isPing) document.getElementById("pingSound").play();

      return `<li class="${isPing ? 'ping' : ''}"><b>${m.user}</b> [${m.timestamp}]: ${decrypted}</li>`;
    }).join("");
}


setInterval(fetchMessages, 1000);
