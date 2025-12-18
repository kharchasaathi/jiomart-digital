import { adminLogin, handleAdminRedirect } from "../core/firebase.js";

console.log("🧩 admin-auth.js loaded");

/* ===============================
   LOGIN BUTTON
================================ */
document.getElementById("adminLoginBtn")?.addEventListener("click", () => {
  console.log("🔐 Admin login clicked");
  adminLogin();
});

/* ===============================
   HANDLE REDIRECT RESULT
================================ */
(async () => {
  const user = await handleAdminRedirect();
  if (!user) return;

  console.log("🔁 Redirect login success:", user.email);
  // ❌ NO adminMode here
})();
