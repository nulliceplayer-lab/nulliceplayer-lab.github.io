import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyBcDDo7gBq4Pj5PlvU41P1UYDm72jZfo10",
  authDomain: "ipcnochess-fun.firebaseapp.com",
  projectId: "ipcnochess-fun",
  storageBucket: "ipcnochess-fun.firebasestorage.app",
  messagingSenderId: "79607942504",
  appId: "1:79607942504:web:9849235ae4a31ea517dadd"
};

// 初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// HTML要素
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const usernameInput = document.getElementById("username");
const messagesDiv = document.getElementById("messages");

// メッセージ送信
sendBtn.addEventListener("click", async () => {

  const text = messageInput.value.trim();
  const username = usernameInput.value.trim() || "名無し";

  if (text === "") return;

  await addDoc(collection(db, "messages"), {
    username: username,
    text: text,
    createdAt: serverTimestamp()
  });

  messageInput.value = "";
});

// メッセージ受信
const q = query(
  collection(db, "messages"),
  orderBy("createdAt")
);

onSnapshot(q, (snapshot) => {

  messagesDiv.innerHTML = "";

  snapshot.forEach((doc) => {

    const data = doc.data();

    const div = document.createElement("div");
    div.className = "message";

    div.innerHTML = `
      <span class="username">${data.username}</span><br>
      ${data.text}
    `;

    messagesDiv.appendChild(div);
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
