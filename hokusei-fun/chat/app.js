// Firebase SDK
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

import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Firebaseを設定
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
const auth = getAuth(app);


// 匿名ログイン
await signInAnonymously(auth);


// DOM
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");


// 送信
sendBtn.addEventListener("click", async () => {
  const text = input.value.trim();

  if (!text) return;

  await addDoc(collection(db, "messages"), {
    text,
    createdAt: serverTimestamp(),
    uid: auth.currentUser.uid
  });

  input.value = "";
});


// リアルタイム受信
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
    div.textContent = data.text;

    messagesDiv.appendChild(div);
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
