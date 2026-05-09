import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Firebase設定
const firebaseConfig = {

  apiKey: "API_KEY",

  authDomain:
    "PROJECT_ID.firebaseapp.com",

  projectId: "PROJECT_ID",

  storageBucket:
    "PROJECT_ID.appspot.com",

  messagingSenderId:
    "SENDER_ID",

  appId: "APP_ID"
};


// 初期化
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider =
  new GoogleAuthProvider();


// HTML
const loginBtn =
  document.getElementById("loginBtn");

const logoutBtn =
  document.getElementById("logoutBtn");

const userInfo =
  document.getElementById("userInfo");

const sendBtn =
  document.getElementById("sendBtn");

const messageInput =
  document.getElementById("messageInput");

const messagesDiv =
  document.getElementById("messages");


// Googleログイン
loginBtn.addEventListener(
  "click",
  async () => {

    try {

      await signInWithPopup(
        auth,
        provider
      );

    } catch (err) {

      console.error(err);
    }
  }
);


// ログアウト
logoutBtn.addEventListener(
  "click",
  async () => {

    await signOut(auth);
  }
);


// ログイン状態監視
onAuthStateChanged(auth, (user) => {

  if (user) {

    loginBtn.style.display =
      "none";

    logoutBtn.style.display =
      "inline-block";

    userInfo.innerHTML = `
      <img
        class="avatar"
        src="${user.photoURL}">
      <br>
      ${user.displayName}
    `;

  } else {

    loginBtn.style.display =
      "inline-block";

    logoutBtn.style.display =
      "none";

    userInfo.textContent =
      "未ログイン";
  }
});


// メッセージ送信
sendBtn.addEventListener(
  "click",
  async () => {

    const user = auth.currentUser;

    if (!user) {

      alert("ログインしてください");
      return;
    }

    let text =
      messageInput.value.trim();

    text = text.slice(0, 300);

    if (!text) return;

    await addDoc(
      collection(db, "messages"),
      {

        uid: user.uid,

        username:
          user.displayName,

        photoURL:
          user.photoURL,

        text,

        createdAt:
          serverTimestamp()
      }
    );

    messageInput.value = "";
  }
);


// メッセージ受信
const q = query(
  collection(db, "messages"),
  orderBy("createdAt")
);

onSnapshot(q, (snapshot) => {

  messagesDiv.innerHTML = "";

  snapshot.forEach((doc) => {

    const data = doc.data();

    const div =
      document.createElement("div");

    div.className = "message";

    // 自分の投稿判定
    if (
      auth.currentUser &&
      data.uid === auth.currentUser.uid
    ) {

      div.classList.add("mine");
    }

    // icon
    const img =
      document.createElement("img");

    img.src = data.photoURL;
    img.className = "avatar";

    // name
    const name =
      document.createElement("div");

    name.className = "username";

    name.textContent =
      data.username;

    // uid
    const uid =
      document.createElement("div");

    uid.className = "uid";

    uid.textContent =
      "UID: " +
      data.uid.slice(0, 8);

    // text
    const text =
      document.createElement("div");

    text.textContent =
      data.text;

    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(uid);
    div.appendChild(text);

    messagesDiv.appendChild(div);
  });

  messagesDiv.scrollTop =
    messagesDiv.scrollHeight;
});
