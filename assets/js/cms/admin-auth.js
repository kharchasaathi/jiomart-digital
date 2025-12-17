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
    try {
      const user = await adminLogin();

      if (user) {
        console.log("✅ Admin logged in");

        // 🔥 THIS IS THE KEY LINE
        setAdminMode(true);

        // Redirect to site (editor + public same page)
        window.location.href = "index.html";
      }
    } catch (err) {
      console.error("❌ Admin login failed:", err);
    }
  });
}

/* Initial UI */
if (loginScreen) loginScreen.classList.remove("hidden");
if (adminPanel) adminPanel.classList.add("hidden");
