/***************************************************
 * ADMIN AUTH HANDLER – FINAL (REDIRECT SAFE)
 * File: assets/js/cms/admin-auth.js
 ***************************************************/

import {
  adminLogin,
  handleAdminRedirect
} from "../core/firebase.js";

import { setAdminMode } from "../core/state.js";

/* ================================
   DOM
================================ */
const loginScreen = document.getElementById("loginScreen");
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("loginBtn");

/* ================================
   LOGIN BUTTON (START REDIRECT)
================================ */
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    console.log("🔐 Admin login button clicked");
    adminLogin(); // 🔥 starts Google redirect
  });
}

/* ================================
   HANDLE REDIRECT RESULT
   (Runs on page load after Google login)
================================ */
(async function checkRedirectLogin() {
  const user = await handleAdminRedirect();

  if (user) {
    console.log("✅ Admin login success:", user.email);

    // 🔥 ENABLE ADMIN MODE
    setAdminMode(true);

    // 🔐 Persist session (page reload safe)
    sessionStorage.setItem("ADMIN_MODE", "true");

    // 🔁 Redirect to editor (same site index)
    window.location.href = "index.html";
  }
})();

/* ================================
   INITIAL UI STATE
================================ */
loginScreen?.classList.remove("hidden");
adminPanel?.classList.add("hidden");
