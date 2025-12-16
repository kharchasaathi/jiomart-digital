/***************************************************
 * ADMIN AUTH HANDLER
 * File: assets/js/cms/admin-auth.js
 ***************************************************/

import { adminLogin } from "../core/firebase.js";

/* DOM */
const loginScreen = document.getElementById("loginScreen");
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("loginBtn");

/* Login button */
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const user = await adminLogin();
    if (user) {
      // redirect to site editor
      window.location.href = "index.html";
    }
  });
}

/* Initial UI */
loginScreen?.classList.remove("hidden");
adminPanel?.classList.add("hidden");
