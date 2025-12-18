/***************************************************
 * ADMIN AUTH – FINAL (NO REDIRECT HANDLER)
 ***************************************************/
import { adminLogin } from "../core/firebase.js";

console.log("🧩 admin-auth.js loaded");

/* ===============================
   LOGIN BUTTON
================================ */
document.getElementById("adminLoginBtn")?.addEventListener("click", () => {
  console.log("🔐 Admin login clicked");
  adminLogin(); // Google redirect starts
});
