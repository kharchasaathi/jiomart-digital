/***************************************************
 * JIOMART DIGITAL – ADMIN AUTH (FINAL & CLEAN)
 * File: assets/js/admin/admin-auth.js
 *
 * ✔ Only triggers Google login
 * ✔ No redirect handling here
 * ✔ No adminMode / UI logic
 ***************************************************/

import { adminLogin } from "../core/firebase.js";

console.log("🧩 admin-auth.js loaded");

/* ===============================
   LOGIN BUTTON HANDLER
================================ */
const loginBtn = document.getElementById("adminLoginBtn");

loginBtn?.addEventListener("click", () => {
  console.log("🔐 Admin login clicked");
  adminLogin();
});
