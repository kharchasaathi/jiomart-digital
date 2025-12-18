/***************************************************
 * JIOMART DIGITAL – ADMIN AUTH (FINAL)
 * File: assets/js/admin/admin-auth.js
 *
 * ✔ Only triggers Google login
 * ✔ Redirect result handled ONLY in firebase.js
 * ✔ No adminMode / UI logic here
 ***************************************************/

import { adminLogin, handleAdminRedirect } from "../core/firebase.js";

console.log("🧩 admin-auth.js loaded");

/* ===============================
   LOGIN BUTTON HANDLER
================================ */
const loginBtn = document.getElementById("adminLoginBtn");

loginBtn?.addEventListener("click", () => {
  console.log("🔐 Admin login clicked");
  adminLogin();
});

/* ===============================
   HANDLE REDIRECT RESULT (PASSIVE)
================================ */
(async () => {
  const user = await handleAdminRedirect();

  if (!user) {
    console.log("↩️ No redirect login result");
    return;
  }

  console.log("✅ Redirect login resolved for:", user.email);

  // ❌ NO setAdminMode
  // ❌ NO UI changes
  // ❌ NO redirects
  // ✅ admin-session.js will react via onAuthChange
})();
