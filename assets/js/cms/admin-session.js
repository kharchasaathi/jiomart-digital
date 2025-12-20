/***************************************************
 * ADMIN SESSION – SINGLE SOURCE OF TRUTH (FINAL)
 ***************************************************/
import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

const ADMIN_EMAIL = "abidalimohammad94@gmail.com";

console.log("🧩 admin-session.js loaded");

onAuthChange(user => {
  const isAdmin = !!user && user.email === ADMIN_EMAIL;

  console.log("🔄 Auth state changed. Admin?", isAdmin);

  setAdminMode(isAdmin);

  document.body.classList.toggle("admin-mode", isAdmin);
  document.getElementById("adminLoginBtn")?.classList.toggle("hidden", isAdmin);
  document.getElementById("adminLogoutBtn")?.classList.toggle("hidden", !isAdmin);

  document.dispatchEvent(
    new CustomEvent("ADMIN_STATE_CHANGED", {
      detail: { isAdmin }
    })
  );

  console.log("📢 ADMIN_STATE_CHANGED dispatched:", isAdmin);
});
