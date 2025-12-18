import { adminLogout } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🚪 admin-logout.js loaded");

const logoutBtn = document.getElementById("adminLogoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    console.log("🚪 Admin logout clicked");

    try {
      await adminLogout();
    } catch (err) {
      console.warn("⚠️ Logout error:", err);
    }

    sessionStorage.removeItem("ADMIN_MODE");
    setAdminMode(false);

    document.body.classList.remove("admin-mode");

    // 🔄 Reload as public user
    window.location.reload();
  });
} else {
  console.log("ℹ️ Logout button not present (public user)");
}
