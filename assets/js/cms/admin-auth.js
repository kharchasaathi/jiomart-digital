/***************************************************
 * ADMIN AUTH HANDLER – FINAL (LOCALSTORAGE BRIDGE)
 * File: assets/js/cms/admin-auth.js
 ***************************************************/

import {
  adminLogin,
  handleAdminRedirect
} from "../assets/js/core/firebase.js";

import { setAdminMode } from "../assets/js/core/state.js";

/* ================================
   DOM
================================ */
const loginBtn = document.getElementById("loginBtn");

/* ================================
   LOGIN BUTTON → START GOOGLE LOGIN
================================ */
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    console.log("🔐 Admin login clicked");
    adminLogin(); // Google redirect
  });
}

/* ================================
   HANDLE GOOGLE REDIRECT RESULT
================================ */
(async function handleLoginRedirect() {
  const user = await handleAdminRedirect();

  if (user) {
    console.log("✅ Admin login success:", user.email);

    // 🔥 CRITICAL BRIDGE (FIX)
    localStorage.setItem("ADMIN_MODE", "true");

    // Update runtime state
    setAdminMode(true);

    // ⏱️ Small delay to ensure storage write
    setTimeout(() => {
      window.location.href = "../index.html"; // back to public site
    }, 100);
  }
})();
