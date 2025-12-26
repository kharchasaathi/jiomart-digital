/***************************************************
 * FIREBASE – EMAIL/PASSWORD ONLY (FINAL & STABLE)
 * ✔ Auth (Email/Password)
 * ✔ Firestore
 * ✔ Storage
 * ✔ Admin mode
 * ✔ SAFE app export (for media upload)
 ***************************************************/

import {
  initializeApp,
  getApps,
  getApp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import { getStorage } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

/* ===============================
   FIREBASE CONFIG
================================ */
const firebaseConfig = {
  apiKey: "AIzaSyByQBpGmHivJhXDqgB-JLpIHUYRr1ZGM7Q",
  authDomain: "jiomart-digital.firebaseapp.com",
  projectId: "jiomart-digital",
  storageBucket: "jiomart-digital.appspot.com",
  messagingSenderId: "703694544124",
  appId: "1:703694544124:web:3d51ddb7fe3182c51e4b79"
};

/* ===============================
   INIT APP (SAFE – SINGLETON)
================================ */
const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

/* 🔥 REQUIRED EXPORT (MEDIA UPLOAD FIX) */
export { app };

/* ===============================
   SERVICES
================================ */
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* ===============================
   ADMIN CONFIG
================================ */
const ADMIN_EMAIL = "abidalimohammad94@gmail.com";

/* ===============================
   LOGIN
================================ */
function adminLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

/* ===============================
   AUTH STATE LISTENER
================================ */
function onAuthChange(callback) {
  return onAuthStateChanged(auth, (user) => {
    if (user && user.email === ADMIN_EMAIL) {
      localStorage.setItem("ADMIN_MODE", "true");
    } else {
      localStorage.removeItem("ADMIN_MODE");
    }
    callback?.(user);
  });
}

/* ===============================
   LOGOUT
================================ */
function adminLogout() {
  localStorage.removeItem("ADMIN_MODE");
  return signOut(auth);
}

/* ===============================
   EXPORTS
================================ */
export {
  auth,
  db,
  storage,
  adminLogin,
  adminLogout,
  onAuthChange
};

console.log("🔥 Firebase Email/Password Auth Loaded");
