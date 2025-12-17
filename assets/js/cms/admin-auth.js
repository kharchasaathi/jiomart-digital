/***************************************************
 * ADMIN AUTH HANDLER – FINAL
 * File: assets/js/cms/admin-auth.js
 ***************************************************/

import { adminLogin } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

/* DOM */
const loginScreen = document.getElementById("loginScreen");
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("loginBtn");

/* Login button */
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const user = await adminLogin();

    if (user) {
      console.log("✅ Admin login success");

      // 🔥 SET ADMIN MODE
      setAdminMode(true);

      // persist admin session
      sessionStorage.setItem("ADMIN_MODE", "true");

      // redirect to editor (same index page)
      window.location.href = "index.html";
    }
  });
}

/* Initial UI */
loginScreen?.classList.remove("hidden");
adminPanel?.classList.add("hidden");
