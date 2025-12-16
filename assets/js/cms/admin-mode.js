/***************************************************
 * ADMIN MODE – SINGLE AUTH CONTROLLER
 ***************************************************/

import { auth } from "../core/firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const adminBar = document.getElementById("adminBar");
  const toolbar = document.getElementById("editorToolbar");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      document.body.classList.add("admin-mode");
      adminBar?.classList.remove("hidden");
      toolbar?.classList.remove("hidden");
      console.log("✅ Admin mode ON");
    } else {
      document.body.classList.remove("admin-mode");
      adminBar?.classList.add("hidden");
      toolbar?.classList.add("hidden");
      console.log("👁 Public mode");
    }
  });
});
