/***************************************************
 * JIOMART DIGITAL – CMS FOUNDATION (PART–1)
 * File: assets/js/firebase.js
 * Purpose:
 *  - Firebase safe initialization (NO duplicate app)
 *  - Auth (Google Login)
 *  - Admin email lock
 *  - Firestore & Storage
 ***************************************************/

/* ================================
   FIREBASE SDK IMPORTS (MODULE)
================================ */
import { initializeApp, getApps, getApp } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  getFirestore
} from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import {
  getStorage
} from
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
   ✅ SAFE INITIALIZE FIREBASE
   (NO DUPLICATE APP ERROR)
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
   ADMIN SECURITY
   👉 ONLY THIS EMAIL IS ADMIN
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
   ADMIN LOGIN FUNCTION
================================ */
async function adminLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user.email !== ADMIN_EMAIL) {
      alert("❌ Access Denied: You are not authorized as Admin.");
      await signOut(auth);
      return null;
    }

    console.log("✅ Admin Logged In:", user.email);
    return user;

  } catch (error) {
    console.error("❌ Login Error:", error);
    alert("Login failed. Please try again.");
    return null;
  }
}

/* ================================
   AUTH STATE OBSERVER
================================ */
function observeAuth(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user && user.email === ADMIN_EMAIL) {
      callback(user);
    } else {
      callback(null);
    }
  });
}

/* ================================
   EXPORTS
================================ */
export {
  auth,
  db,
  storage,
  adminLogin,
  observeAuth
};

/* ================================
   DEBUG
================================ */
console.log("🔥 Firebase CMS Foundation Loaded (PART–1)");
