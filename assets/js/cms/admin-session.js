/***************************************************
 * ADMIN SESSION SYNC – FINAL (LOCALSTORAGE SOURCE)
 * File: assets/js/cms/admin-session.js
 ***************************************************/

import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🧩 admin-session.js loaded");

/* ================================
   1️⃣ LOCALSTORAGE = SOURCE OF TRUTH
================================ */
const storedAdmin = localStorage.getItem("ADMIN_MODE");

if (storedAdmin === "true") {
  console.log("🛡 Admin session detected (localStorage)");

  setAdminMode(true);
  document.body.classList.add("admin-mode");
} else {
  console.log("ℹ️ No admin session in localStorage");
}

/* ================================
   2️⃣ FIREBASE AUTH = SUPPORT ONLY
   ✅ Upgrade admin session if user exists
   ❌ NEVER downgrade admin session here
================================ */
onAuthChange((user) => {
  if (user) {
    console.log("🔐 Firebase auth active:", user.email);

    // 🔥 reinforce admin session
    localStorage.setItem("ADMIN_MODE", "true");

    setAdminMode(true);
    document.body.classList.add("admin-mode");
  } else {
    console.log("ℹ️ Firebase auth not ready / logged out");
    // ❌ DO NOTHING
    // ❌ DO NOT clear localStorage
    // ❌ DO NOT set adminMode(false)
  }
});
