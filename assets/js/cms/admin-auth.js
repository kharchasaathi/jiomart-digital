import { adminLogin, handleAdminRedirect } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🧩 admin-auth.js loaded");

const loginBtn = document.getElementById("adminLoginBtn");

loginBtn?.addEventListener("click", () => {
  console.log("🔐 Admin login clicked");
  adminLogin();
});

// 🔁 HANDLE REDIRECT (NO PAGE CHANGE)
(async () => {
  const user = await handleAdminRedirect();

  if (!user) return;

  console.log("✅ Admin login success:", user.email);

  // 🔐 Enable admin mode
  localStorage.setItem("ADMIN_MODE", "true");
  setAdminMode(true);

  document.body.classList.add("admin-mode");

  // UI switch
  document.getElementById("adminLoginBtn")?.classList.add("hidden");
  document.getElementById("adminLogoutBtn")?.classList.remove("hidden");

  // ❌ NO window.location.href
  // ❌ NO admin.html
})();
