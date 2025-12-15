
/***************************************************
 * JIOMART DIGITAL – CMS FOUNDATION (PART–1)
 * File: assets/js/firebase.js
 * Purpose:
 *  - Firebase initialization
 *  - Auth (Google Login)
 *  - Admin email lock (ONLY YOU)
 *  - Firestore & Storage ready
 ***************************************************/

/* ================================
   FIREBASE SDK IMPORTS (MODULE)
================================ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

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
   INITIALIZE FIREBASE
================================ */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* ================================
   ADMIN SECURITY (VERY IMPORTANT)
   👉 ONLY THIS EMAIL CAN OPERATE
================================ */
const ADMIN_EMAIL = "yourgmail@gmail.com"; 
// ⚠️ PART–2 లో నీ actual Gmail తో replace చేస్తాం

/* ================================
   GOOGLE AUTH PROVIDER
================================ */
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

/* ================================
   LOGIN FUNCTION (ADMIN ONLY)
================================ */
async function adminLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user.email !== ADMIN_EMAIL) {
      alert("Access Denied: You are not authorized as Admin.");
      await auth.signOut();
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
   AUTH STATE LISTENER
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
   EXPORTS (FOR NEXT PARTS)
================================ */
export {
  auth,
  db,
  storage,
  adminLogin,
  observeAuth
};

/* ================================
   DEBUG (SAFE)
================================ */
console.log("🔥 Firebase CMS Foundation Loaded (PART–1)");
