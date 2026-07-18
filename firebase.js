import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    onSnapshot,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDegsDsNmQHye0-A4zJXI_b5mGVhjzvy-c",
    authDomain: "meh-chat-d78f5.firebaseapp.com",
    projectId: "meh-chat-d78f5",
    storageBucket: "meh-chat-d78f5.firebasestorage.app",
    messagingSenderId: "187231270162",
    appId: "1:187231270162:web:6ce37485f3bb6e18046fcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// Export everything we'll use
export {
    db,
    doc,
    setDoc,
    getDoc,
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    onSnapshot,
    updateDoc,
    deleteDoc
};
