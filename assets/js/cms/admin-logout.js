/***************************************************
 * ADMIN LOGOUT HANDLER – FINAL (LOCALSTORAGE)
 * File: assets/js/cms/admin-logout.js
 ***************************************************/

import { adminLogout } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

const logoutBtn = document.getElementById("adminLogoutBtn");

if (!logoutBtn) {
  console.log("ℹ️ adminLogoutBtn not found");
} else {
  logoutBtn.addEventListener("click", async () => {
    console.log("🚪 Admin logout clicked");

    try {
      // 🔐 Firebase logout
      await adminLogout();
    } catch (err) {
      console.warn("⚠️ Firebase logout failed / already logged out", err);
    }

    // 🧹 CLEAR ADMIN SESSION (SOURCE OF TRUTH)
    localStorage.removeItem("ADMIN_MODE");

    // 🔻 UPDATE STATE
    setAdminMode(false);
    document.body.classList.remove("admin-mode");

    console.log("✅ Admin session cleared");

    // 🔁 Reload SAME public page (clean state)
    window.location.reload();
  });
}
