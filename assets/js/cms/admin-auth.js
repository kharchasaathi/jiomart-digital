/***************************************************
 * ADMIN AUTH HANDLER – FINAL (PATH FIXED)
 ***************************************************/

import { adminLogin, handleAdminRedirect } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🧩 admin-auth.js loaded");

const loginBtn = document.getElementById("loginBtn");

loginBtn?.addEventListener("click", () => {
  console.log("🔐 Admin login clicked");
  adminLogin();
});

(async () => {
  const user = await handleAdminRedirect();

  if (user) {
    console.log("✅ Admin login success:", user.email);

    // 🔥 BRIDGE
    localStorage.setItem("ADMIN_MODE", "true");
    setAdminMode(true);

    console.log("🛡 ADMIN_MODE stored");

    window.location.href = "index.html";
  }
})();
