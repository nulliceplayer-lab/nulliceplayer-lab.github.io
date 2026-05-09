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

// 文字数制限
const MAX_MESSAGE_LENGTH = 300;
const MAX_USERNAME_LENGTH = 30;


// メッセージ送信
sendBtn.addEventListener("click", async () => {

  let text = messageInput.value.trim();
  let username = usernameInput.value.trim();

  if (!username) username = "名無し";

  // 長さ制限
  text = text.slice(0, MAX_MESSAGE_LENGTH);
  username = username.slice(0, MAX_USERNAME_LENGTH);

  if (text === "") return;

  try {

    await addDoc(collection(db, "messages"), {
      username,
      text,
      createdAt: serverTimestamp()
    });

    messageInput.value = "";

  } catch (err) {

    console.error(err);
    alert("送信失敗");

  }
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

    // message box
    const wrapper = document.createElement("div");
    wrapper.className = "message";

    // username
    const usernameEl = document.createElement("span");
    usernameEl.className = "username";

    // textContentを使う
    usernameEl.textContent = data.username;

    // 改行
    const br = document.createElement("br");

    // message
    const textEl = document.createElement("span");

    // textContentを使う
    textEl.textContent = data.text;

    // append
    wrapper.appendChild(usernameEl);
    wrapper.appendChild(br);
    wrapper.appendChild(textEl);

    messagesDiv.appendChild(wrapper);
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
