/***************************************************
 * ADMIN SESSION – SINGLE SOURCE OF TRUTH
 * - Syncs Firebase auth → adminMode
 * - Handles login & logout UI
 ***************************************************/

import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🧩 admin-session.js loaded");

/* ===============================
   RESTORE FROM LOCAL STORAGE
================================ */
const storedAdmin = localStorage.getItem("ADMIN_MODE") === "true";

if (storedAdmin) {
  setAdminMode(true);
  document.body.classList.add("admin-mode");
}

/* ===============================
   FIREBASE AUTH LISTENER
================================ */
onAuthChange((user) => {
  if (user) {
    console.log("✅ Firebase auth logged in:", user.email);

    // 🔐 ADMIN ENABLE
    localStorage.setItem("ADMIN_MODE", "true");
    setAdminMode(true);

    document.body.classList.add("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.add("hidden");
    document.getElementById("adminLogoutBtn")?.classList.remove("hidden");

  } else {
    console.log("ℹ️ Public session");

    // 🔓 ADMIN DISABLE
    localStorage.removeItem("ADMIN_MODE");
    setAdminMode(false);

    document.body.classList.remove("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.remove("hidden");
    document.getElementById("adminLogoutBtn")?.classList.add("hidden");
  }
});
