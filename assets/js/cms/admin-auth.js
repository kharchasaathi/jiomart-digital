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
    adminLogin(); // 🔥 Google redirect starts
  });
}

/* ================================
   HANDLE REDIRECT RESULT
   (Runs after Google login redirect)
================================ */
(async function checkRedirectLogin() {
  const user = await handleAdminRedirect();

  if (user) {
    console.log("✅ Admin login success:", user.email);

    // 🔥 Enable admin mode
    setAdminMode(true);

    // 🔐 Persist admin session
    sessionStorage.setItem("ADMIN_MODE", "true");

    // ✅ CORRECT REDIRECT (ADMIN → PUBLIC INDEX)
    window.location.href = "../index.html";
  }
})();

/* ================================
   INITIAL UI STATE
================================ */
loginScreen?.classList.remove("hidden");
adminPanel?.classList.add("hidden");
