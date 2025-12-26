/***************************************************
 * ADMIN SESSION – FINAL & STABLE (CMS + EDITOR READY)
 ***************************************************/
import { onAuthChange } from "/jiomart-digital/assets/js/core/firebase.js";
import { setAdminMode } from "/jiomart-digital/assets/js/core/state.js";

const ADMIN_EMAIL = "abidalimohammad94@gmail.com";

console.log("🧩 admin-session.js loaded");

onAuthChange(user => {
  const isAdmin =
    !!user && user.email === ADMIN_EMAIL;

  console.log("🔐 Auth state changed. Admin?", isAdmin);

  /* GLOBAL ADMIN STATE */
  setAdminMode(isAdmin);

  /* BODY FLAG */
  document.body.classList.toggle(
    "admin-mode",
    isAdmin
  );

  /* LOGIN / LOGOUT BUTTONS */
  document
    .getElementById("adminLoginBtn")
    ?.classList.toggle("hidden", isAdmin);

  document
    .getElementById("adminLogoutBtn")
    ?.classList.toggle("hidden", !isAdmin);

  /* CMS BROADCAST */
  document.dispatchEvent(
    new CustomEvent("ADMIN_STATE_CHANGED", {
      detail: { adminMode: isAdmin }
    })
  );

  console.log(
    "📢 ADMIN_STATE_CHANGED dispatched:",
    isAdmin
  );

  /* ENABLE EDITOR */
  if (isAdmin) {
    document.dispatchEvent(
      new Event("ENABLE_ADMIN_EDITOR")
    );
    console.log("✏️ Admin editor enabled");
  }
});
