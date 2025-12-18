/***************************************************
 * ADMIN SESSION SYNC – FINAL (SINGLE SOURCE OF TRUTH)
 ***************************************************/

import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🧩 admin-session.js loaded");

/* ================================
   🔁 UI HELPERS
================================ */
function showAdminUI() {
  document.body.classList.add("admin-mode");
  document.getElementById("adminLoginBtn")?.classList.add("hidden");
  document.getElementById("adminLogoutBtn")?.classList.remove("hidden");
}

function showPublicUI() {
  document.body.classList.remove("admin-mode");
  document.getElementById("adminLoginBtn")?.classList.remove("hidden");
  document.getElementById("adminLogoutBtn")?.classList.add("hidden");
}

/* ================================
   1️⃣ RESTORE FROM localStorage
   (FAST, SYNC, NO FIREBASE WAIT)
================================ */
const storedAdmin = localStorage.getItem("ADMIN_MODE");

if (storedAdmin === "true") {
  console.log("🛡 Admin session restored from localStorage");
  setAdminMode(true);
  showAdminUI();
} else {
  showPublicUI();
}

/* ================================
   2️⃣ FIREBASE AUTH SYNC
   🔥 NEVER FORCE LOGOUT ON LOAD
================================ */
onAuthChange((user) => {
  if (user) {
    console.log("🔐 Firebase auth active:", user.email);

    localStorage.setItem("ADMIN_MODE", "true");
    setAdminMode(true);
    showAdminUI();
  } else {
    console.log("ℹ️ Firebase auth logged out");

    localStorage.removeItem("ADMIN_MODE");
    setAdminMode(false);
    showPublicUI();
  }
});
