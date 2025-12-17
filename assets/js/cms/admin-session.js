/***************************************************
 * ADMIN SESSION SYNC – FINAL (FIXED)
 * File: assets/js/cms/admin-session.js
 ***************************************************/

import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🧩 admin-session.js loaded");

/* ================================
   1️⃣ SESSION STORAGE CHECK
================================ */
const storedAdmin = sessionStorage.getItem("ADMIN_MODE");

if (storedAdmin === "true") {
  console.log("🛡 Admin session from sessionStorage");
  setAdminMode(true);
  document.body.classList.add("admin-mode");
} else {
  console.log("ℹ️ No admin session in sessionStorage");
}

/* ================================
   2️⃣ FIREBASE AUTH LISTENER
================================ */
onAuthChange((user) => {
  if (user) {
    console.log("🔐 Firebase auth active:", user.email);

    setAdminMode(true);
    sessionStorage.setItem("ADMIN_MODE", "true");
    document.body.classList.add("admin-mode");

  } else {
    console.log("🚪 Firebase auth logged out");

    setAdminMode(false);
    sessionStorage.removeItem("ADMIN_MODE");
    document.body.classList.remove("admin-mode");
  }
});
