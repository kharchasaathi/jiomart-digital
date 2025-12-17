/***************************************************
 * JIOMART DIGITAL – CMS FOUNDATION (FINAL)
 * File: assets/js/core/firebase.js
 *
 * Features:
 *  - Safe Firebase initialization
 *  - Google Auth (REDIRECT – popup free)
 *  - Admin email restriction
 *  - Firestore & Storage access
 *  - Logout support
 ***************************************************/

/* ================================
   FIREBASE SDK IMPORTS
================================ */
import { initializeApp, getApps, getApp } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged
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
provider.setCustomParameters({
  prompt: "select_account"
});

/* ================================
   ADMIN LOGIN (REDIRECT SAFE)
================================ */
function adminLogin() {
  console.log("🔐 Redirecting to Google login...");
  return signInWithRedirect(auth, provider);
}

/* ================================
   HANDLE LOGIN REDIRECT RESULT
================================ */
async function handleAdminRedirect() {
  try {
    const result = await getRedirectResult(auth);

    if (!result || !result.user) return null;

    const user = result.user;

    // 🔒 Admin email check
    if (user.email !== ADMIN_EMAIL) {
      alert("❌ Access denied");
      await signOut(auth);
      return null;
    }

    console.log("✅ Admin logged in:", user.email);
    return user;

  } catch (err) {
    console.error("❌ Redirect login failed:", err);
    return null;
  }
}

/* ================================
   LOGOUT
================================ */
function adminLogout() {
  console.log("🚪 Admin logout");
  return signOut(auth);
}

/* ================================
   AUTH STATE LISTENER
================================ */
function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

/* ================================
   EXPORTS
================================ */
export {
  auth,
  db,
  storage,
  adminLogin,
  handleAdminRedirect,
  adminLogout,
  onAuthChange
};

/* ================================
   DEBUG
================================ */
console.log("🔥 Firebase CMS Foundation Loaded (FINAL)");
