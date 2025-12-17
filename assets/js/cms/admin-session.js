/***************************************************
 * ADMIN SESSION SYNC
 * File: assets/js/cms/admin-session.js
 ***************************************************/

import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

const ADMIN_EMAIL = "abidalimohammad94@gmail.com";

onAuthChange((user) => {
  if (user && user.email === ADMIN_EMAIL) {
    console.log("🛡 Admin session detected");
    setAdminMode(true);
    document.body.classList.add("admin-mode");
  } else {
    setAdminMode(false);
    document.body.classList.remove("admin-mode");
  }
});
