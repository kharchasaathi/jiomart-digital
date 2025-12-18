/***************************************************
 * ADMIN SESSION SYNC – FINAL FIXED
 ***************************************************/

import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🧩 admin-session.js loaded");

/* ================================
   1️⃣ SESSION STORAGE (SOURCE OF TRUTH)
================================ */
const storedAdmin = sessionStorage.getItem("ADMIN_MODE");

if (storedAdmin === "true") {
  console.log("🛡 Admin session restored from sessionStorage");
  setAdminMode(true);
  document.body.classList.add("admin-mode");
}

/* ================================
   2️⃣ FIREBASE AUTH (ONLY UPGRADE)
   ❌ NEVER FORCE LOGOUT HERE
================================ */
onAuthChange((user) => {
  if (user) {
    console.log("🔐 Firebase auth active:", user.email);

    setAdminMode(true);
    sessionStorage.setItem("ADMIN_MODE", "true");
    document.body.classList.add("admin-mode");
  } else {
    console.log("ℹ️ Firebase auth not ready / logged out");
    // ❌ DO NOTHING HERE
    // ❌ DO NOT clear adminMode
  }
});
