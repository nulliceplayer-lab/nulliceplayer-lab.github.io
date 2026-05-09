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

    try {

      const user = auth.currentUser;

      if (!user) {

        alert("ログイン必要");
        return;
      }

      let text =
        messageInput.value.trim();

      text = text.slice(0, 300);

      if (!text) return;

      const messageData = {

        uid: String(user.uid),

    username:
    localStorage.getItem("nickname")
    || user.displayName
    || "Unknown",
        photoURL:
          String(user.photoURL || ""),

        text: String(text),

        createdAt:
          serverTimestamp()
      };

      console.log(messageData);

      await addDoc(
        collection(db, "messages"),
        messageData
      );

      messageInput.value = "";

    } catch (err) {

      console.error(err);

      alert(
        "送信失敗:\n" + err.message
      );
    }
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
  (data.uid
    ? data.uid.slice(0, 8)
    : "unknown");

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

const nicknameInput =
  document.getElementById(
    "nicknameInput"
  );

const saveNicknameBtn =
  document.getElementById(
    "saveNicknameBtn"
  );
// ニックネーム保存
saveNicknameBtn.addEventListener(
  "click",
  () => {

    let nickname =
      nicknameInput.value.trim();

    nickname =
      nickname.slice(0, 20);

    if (!nickname) return;

    localStorage.setItem(
      "nickname",
      nickname
    );

    alert("保存しました");
  }
);
const savedNickname =
  localStorage.getItem(
    "nickname"
  );

if (savedNickname) {

  nicknameInput.value =
    savedNickname;
}
