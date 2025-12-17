/***************************************************
 * ADMIN LOGOUT HANDLER
 ***************************************************/
import { signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { auth } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("adminLogoutBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const confirmLogout = confirm("Logout from admin?");
    if (!confirmLogout) return;

    await signOut(auth);

    // 🔐 Reset CMS state
    setAdminMode(false);

    console.log("🚪 Admin logged out");

    // 🔄 Reload public site
    window.location.reload();
  });
});
