import { adminLogin, handleAdminRedirect } from "../core/firebase.js";

console.log("🧩 admin-auth.js loaded");

/* ===============================
   SAFE DOM READY
================================ */
window.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("adminLoginBtn");

  if (!loginBtn) {
    console.warn("❌ adminLoginBtn not found in DOM");
    return;
  }

  console.log("✅ adminLoginBtn found");

  loginBtn.addEventListener("click", () => {
    console.log("🔐 Admin login clicked");
    adminLogin();
  });
});

/* ===============================
   HANDLE REDIRECT RESULT
================================ */
(async () => {
  const user = await handleAdminRedirect();
  if (!user) return;

  console.log("🔁 Redirect login success:", user.email);
})();
