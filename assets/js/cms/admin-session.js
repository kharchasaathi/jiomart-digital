/***************************************************
 * ADMIN SESSION SYNC – FINAL (AUTHORITATIVE)
 ***************************************************/

import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";
import { renderPage } from "./render.js";

console.log("🧩 admin-session.js loaded");

onAuthChange((user) => {
  if (user) {
    console.log("🔐 Firebase auth active:", user.email);

    setAdminMode(true);
    sessionStorage.setItem("ADMIN_MODE", "true");
    document.body.classList.add("admin-mode");

  } else {
    console.log("🚪 Firebase auth logged out");

    setAdminMode(false);
    sessionStorage.removeItem("ADMIN_MODE");
    document.body.classList.remove("admin-mode");
  }

  // 🔥 RE-RENDER AFTER AUTH STATE CONFIRMED
  renderPage();
});
