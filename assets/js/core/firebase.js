/***************************************************
 * JIOMART DIGITAL – CMS FOUNDATION (CLEAN)
 * File: assets/js/core/firebase.js
 *
 * Purpose:
 *  - Safe Firebase initialization
 *  - Google Auth login helper (NO state observer)
 *  - Firestore & Storage access
 ***************************************************/

/* ================================
   FIREBASE SDK IMPORTS
================================ */
import { initializeApp, getApps, getApp } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import { getStorage } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

/* ================================
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

/* ================================
   SAFE INITIALIZATION
================================ */
const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

/* ================================
   SERVICES
================================ */
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* ================================
   ADMIN CONFIG
================================ */
const ADMIN_EMAIL = "abidalimohammad94@gmail.com";

/* ================================
   GOOGLE AUTH PROVIDER
================================ */
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

/* ================================
   ADMIN LOGIN (NO STATE LOGIC)
================================ */
async function adminLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user.email !== ADMIN_EMAIL) {
      alert("❌ Access Denied");
      await signOut(auth);
      return null;
    }

    console.log("✅ Admin logged in:", user.email);
    return user;

  } catch (err) {
    console.error("❌ Login failed:", err);
    alert("Login failed");
    return null;
  }
}

/* ================================
   EXPORTS
================================ */
export {
  auth,
  db,
  storage,
  adminLogin
};

/* ================================
   DEBUG
================================ */
console.log("🔥 Firebase CMS Foundation Loaded (CLEAN)");
