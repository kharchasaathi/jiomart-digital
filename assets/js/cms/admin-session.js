/***************************************************
 * JIOMART DIGITAL – ADMIN SESSION (FINAL)
 * File: assets/js/admin/admin-session.js
 *
 * ✔ Single source of truth: onAuthChange
 * ✔ No duplicate auth logic
 * ✔ UI reacts to ADMIN_MODE only
 ***************************************************/

import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

const ADMIN_EMAIL = "abidalimohammad94@gmail.com";

console.log("🧩 admin-session.js loaded");

/* ================================
   AUTH SESSION HANDLER
================================ */
onAuthChange((user) => {

  const isAdmin =
    !!user && user.email === ADMIN_EMAIL;

  if (isAdmin) {
    console.log("✅ Admin session confirmed:", user.email);

    // State
    setAdminMode(true);

    // UI
    document.body.classList.add("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.add("hidden");
    document.getElementById("adminLogoutBtn")?.classList.remove("hidden");

  } else {
    console.log("👁 Public session active");

    // State
    setAdminMode(false);

    // UI
    document.body.classList.remove("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.remove("hidden");
    document.getElementById("adminLogoutBtn")?.classList.add("hidden");
  }

});
