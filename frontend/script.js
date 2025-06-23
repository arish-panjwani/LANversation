const host = "https://lanversation.onrender.com";
let cachedAnonymousName = null;

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

function getExistingNames() {
  const chatBox = document.getElementById("chatBox");
  const names = new Set();
  chatBox.querySelectorAll("b").forEach(b => {
    names.add(b.textContent);
  });
  return names;
}

function getRandomAnonymousName() {
  const animals = [
    "CleverFox", "BraveLion", "SilentOwl", "SwiftFalcon",
    "MightyBear", "SneakySnake", "HappyPanda",
    "WiseTurtle", "QuickRabbit", "GentleDolphin"
  ];
  return animals[Math.floor(Math.random() * animals.length)];
}

function getRandomUniqueAnonymousName() {
  const animals = [
    "CleverFox", "BraveLion", "SilentOwl", "SwiftFalcon",
    "MightyBear", "SneakySnake", "HappyPanda",
    "WiseTurtle", "QuickRabbit", "GentleDolphin"
  ];
  const existingNames = getExistingNames();

  const shuffled = animals.sort(() => 0.5 - Math.random());

  for (const name of shuffled) {
    if (!existingNames.has(name)) {
      return name;
    }
  }

  // Fallback: all taken, append random number
  return `${animals[Math.floor(Math.random() * animals.length)]}_${Math.floor(Math.random() * 1000)}`;
}

function getSessionUserName() {
  const usernameInput = document.getElementById("username").value.trim();
  if (usernameInput) {
    return usernameInput;
  }

  if (!cachedAnonymousName) {
    cachedAnonymousName = getRandomUniqueAnonymousName();
  }

  return cachedAnonymousName;
}

function formatEDTTime(isoString) {
  try {
    const date = new Date(isoString);
    const options = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Toronto'
    };
    return `${date.toLocaleString('en-US', options).replace(' ', '')} EDT`;
  } catch {
    return "Invalid Time";
  }
}

async function sendMessage() {
  const user = getSessionUserName();
  const key = getKey();
  const message = document.getElementById("message").value.trim();

  if (!message || !key) {
    alert("Message and key are required.");
    return;
  }

  await fetch(`${host}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user,
      key_hash: getKeyHash(),
      message: encryptMessage(message),
    }),
  });

  document.getElementById("message").value = "";
}

function sendPing() {
  const user = getSessionUserName();
  const key = getKey();

  if (!key) {
    alert("Encryption key is required for pinging.");
    return;
  }

  fetch(`${host}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user,
      key_hash: getKeyHash(),
      message: encryptMessage("✋"),
    }),
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
      if (isPing) {
        document.getElementById("pingSound").play();
      }

      const formattedTime = formatEDTTime(m.timestamp);

      return `<li class="${isPing ? 'ping' : ''}"><b>${m.user}</b> [${formattedTime}]: ${decrypted}</li>`;
    })
    .join("");
}

setInterval(fetchMessages, 1000);
