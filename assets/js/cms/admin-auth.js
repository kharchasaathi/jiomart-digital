/***************************************************
 * ADMIN AUTH HANDLER – FINAL (STABLE & SAFE)
 * File: assets/js/cms/admin-auth.js
 ***************************************************/

import { adminLogin, handleAdminRedirect } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

/* ================================
   DOM
================================ */
const loginBtn = document.getElementById("loginBtn");

/* ================================
   LOGIN BUTTON → START GOOGLE REDIRECT
================================ */
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    console.log("🔐 Admin login button clicked");
    adminLogin(); // 🔥 Google redirect starts here
  });
}

/* ================================
   HANDLE GOOGLE REDIRECT RESULT
   (Runs AFTER Google login)
================================ */
(async function handleRedirectResult() {
  const user = await handleAdminRedirect();

  if (user) {
    console.log("✅ Admin login success:", user.email);

    // 🔥 Enable admin mode (runtime)
    setAdminMode(true);

    // 🔐 Persist admin session (for public site)
    sessionStorage.setItem("ADMIN_MODE", "true");

    // 🔁 Redirect ADMIN → PUBLIC SITE
    // admin.html → index.html
    window.location.href = "../index.html";
  }
})();
