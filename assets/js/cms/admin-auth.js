/***************************************************
 * ADMIN AUTH HANDLER – FINAL FIX
 ***************************************************/

import { adminLogin, handleAdminRedirect } from "../assets/js/core/firebase.js";
import { setAdminMode } from "../assets/js/core/state.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn?.addEventListener("click", () => {
  console.log("🔐 Admin login clicked");
  adminLogin();
});

(async function () {
  const user = await handleAdminRedirect();

  if (user) {
    console.log("✅ Admin login success:", user.email);

    // 🔥 THIS IS THE BRIDGE
    sessionStorage.setItem("ADMIN_MODE", "true");

    setAdminMode(true);

    // ⏱️ HARD DELAY (IMPORTANT)
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 300);
  }
})();
