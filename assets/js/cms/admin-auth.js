/***************************************************
 * ADMIN AUTH – LOGIN PAGE ONLY (FINAL)
 ***************************************************/

import { adminLogin, handleAdminRedirect } from "../core/firebase.js";

console.log("🧩 admin-auth.js loaded (ADMIN PAGE ONLY)");

const loginBtn = document.getElementById("loginBtn");

loginBtn?.addEventListener("click", () => {
  console.log("🔐 Admin login clicked");
  adminLogin();
});

// 🔁 HANDLE FIREBASE REDIRECT (ADMIN PAGE ONLY)
(async () => {
  const user = await handleAdminRedirect();

  if (user) {
    console.log("✅ Admin login success:", user.email);

    // ✅ SINGLE SOURCE OF TRUTH
    localStorage.setItem("ADMIN_MODE", "true");

    // ⏱️ Redirect back to public site
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 200);
  }
})();
