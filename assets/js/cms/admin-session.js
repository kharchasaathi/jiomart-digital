/***************************************************
 * ADMIN SESSION – FINAL (SINGLE SOURCE OF TRUTH)
 * - Syncs Firebase Auth
 * - Restores adminMode correctly after redirect
 * - Controls Login / Logout UI
 ***************************************************/

import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🧩 admin-session.js loaded");

// UI helpers
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

// 🔥 Firebase auth is the ONLY truth
onAuthChange((user) => {
  if (user) {
    console.log("✅ Admin session active:", user.email);

    localStorage.setItem("ADMIN_MODE", "true");
    setAdminMode(true);
    showAdminUI();

  } else {
    console.log("👤 Public session");

    localStorage.removeItem("ADMIN_MODE");
    setAdminMode(false);
    showPublicUI();
  }
});
