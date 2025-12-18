/***************************************************
 * ADMIN LOGOUT HANDLER – FINAL
 ***************************************************/

import { adminLogout } from "../core/firebase.js";

console.log("🧩 admin-logout.js loaded");

const logoutBtn = document.getElementById("adminLogoutBtn");

logoutBtn?.addEventListener("click", async () => {
  console.log("🚪 Admin logout clicked");

  try {
    await adminLogout();
    // ✅ All cleanup handled by admin-session.js via onAuthChange
  } catch (err) {
    console.error("❌ Logout failed:", err);
  }
});
