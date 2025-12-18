import { adminLogin, handleAdminRedirect } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🧩 admin-auth.js loaded");

const loginBtn = document.getElementById("adminLoginBtn");

loginBtn?.addEventListener("click", () => {
  console.log("🔐 Admin login clicked");
  adminLogin();
});

// 🔁 HANDLE REDIRECT ON SAME PAGE
(async () => {
  const user = await handleAdminRedirect();

  if (user) {
    console.log("✅ Admin login success:", user.email);

    localStorage.setItem("ADMIN_MODE", "true");
    setAdminMode(true);

    document.body.classList.add("admin-mode");

    // UI switch
    document.getElementById("adminLoginBtn")?.classList.add("hidden");
    document.getElementById("adminLogoutBtn")?.classList.remove("hidden");
  }
})();
