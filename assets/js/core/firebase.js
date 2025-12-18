/***************************************************
 * JIOMART DIGITAL – CMS FOUNDATION (FINAL & SAFE)
 * File: assets/js/core/firebase.js
 *
 * ✔ No admin page redirect
 * ✔ Admin = MODE (not URL)
 * ✔ Google Auth (Redirect – popup free)
 * ✔ Admin email restriction
 * ✔ Firestore + Storage ready
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
   ADMIN LOGIN (REDIRECT ONLY)
================================ */
function adminLogin() {
  console.log("🔐 Admin login started (redirect)");
  return signInWithRedirect(auth, provider);
}

/* ================================
   HANDLE REDIRECT RESULT
================================ */
async function handleAdminRedirect() {
  try {
    const result = await getRedirectResult(auth);

    if (!result || !result.user) return null;

    const user = result.user;

    // 🔒 Email restriction
    if (user.email !== ADMIN_EMAIL) {
      alert("❌ Access denied");
      await signOut(auth);
      return null;
    }

    console.log("✅ Admin authenticated:", user.email);

    // ✅ Admin MODE only (NO redirect)
    localStorage.setItem("ADMIN_MODE", "true");

    return user;

  } catch (err) {
    console.error("❌ Redirect login error:", err);
    return null;
  }
}

/* ================================
   AUTH STATE LISTENER
================================ */
function onAuthChange(callback) {
  return onAuthStateChanged(auth, (user) => {
    if (user && user.email === ADMIN_EMAIL) {
      console.log("🔐 Admin session active");
      localStorage.setItem("ADMIN_MODE", "true");
    } else {
      console.log("👁 Public session");
      localStorage.removeItem("ADMIN_MODE");
    }

    if (typeof callback === "function") {
      callback(user);
    }
  });
}

/* ================================
   LOGOUT
================================ */
async function adminLogout() {
  console.log("🚪 Admin logout");
  localStorage.removeItem("ADMIN_MODE");
  await signOut(auth);
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
