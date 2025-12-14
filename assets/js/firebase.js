// assets/js/firebase.js
// =======================
// Firebase Initialization
// =======================

// 🔴 STEP 1: Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// 🔴 STEP 2: Firebase Config (TEMP — replace later)
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://PASTE_YOUR_PROJECT.firebaseio.com",
  projectId: "PASTE_YOUR_PROJECT",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

// 🔴 STEP 3: Initialize Firebase
export const app = initializeApp(firebaseConfig);

// 🔴 STEP 4: Services
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

// 🔴 STEP 5: Console check
console.log("🔥 Firebase Connected Successfully");
