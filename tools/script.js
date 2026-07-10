import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB_fYiDRjISNEaizx7zawu9yBM4cZ6nTU4",
    authDomain: "itrsa-sefe-api.firebaseapp.com",
    projectId: "itrsa-sefe-api",
    storageBucket: "itrsa-sefe-api.firebasestorage.app",
    messagingSenderId: "1052292785682",
    appId: "1:1052292785682:web:7c7f08b873362ab5759acb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const button = document.getElementById("postBtn");

button.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !message) {
        alert("入力してください");
        return;
    }

    try {

        await addDoc(collection(db, "posts"), {
            name: name,
            message: message,
            time: serverTimestamp()
        });

        document.getElementById("status").textContent = "投稿しました！";

        document.getElementById("name").value = "";
        document.getElementById("message").value = "";

    } catch (e) {
        console.error(e);
        document.getElementById("status").textContent = "投稿に失敗しました";
    }

});
