/***************************************************
 * ADMIN AUTH – SAFE SINGLE PAGE LOGIN
 * - Google Redirect login
 * - NO page navigation
 * - NO /admin path
 * - Enables adminMode on same page
 ***************************************************/

import { adminLogin, handleAdminRedirect } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🧩 admin-auth.js loaded");

/* ===============================
   LOGIN BUTTON HANDLER
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("adminLoginBtn");

  if (!loginBtn) return;

  loginBtn.addEventListener("click", () => {
    console.log("🔐 Admin login clicked");
    adminLogin(); // Firebase Google redirect
  });
});

/* ===============================
   HANDLE REDIRECT RESULT
   (Runs after returning from Google)
================================ */
(async function handleRedirect() {
  const user = await handleAdminRedirect();

  if (!user) return;

  console.log("✅ Admin login success:", user.email);

  // 🔐 Persist admin mode
  localStorage.setItem("ADMIN_MODE", "true");
  setAdminMode(true);

  // UI toggle
  document.body.classList.add("admin-mode");
  document.getElementById("adminLoginBtn")?.classList.add("hidden");
  document.getElementById("adminLogoutBtn")?.classList.remove("hidden");

  // ❌ No redirects
  // ❌ No admin.html
})();
