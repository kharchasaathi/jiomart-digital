/* ===============================
   ADMIN MODE HANDLER
   File: cms/admin-mode.js
================================ */

import { auth } from "../core/firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

/* DOM ELEMENTS (SAFE) */
const adminBar = document.getElementById("adminBar");
const toolbar = document.getElementById("editorToolbar");

/* ===============================
   AUTH STATE OBSERVER (SINGLE)
================================ */
onAuthStateChanged(auth, (user) => {
  if (user) {
    // ✅ ADMIN MODE ENABLE
    document.body.classList.add("admin-mode");

    if (adminBar) adminBar.classList.remove("hidden");
    if (toolbar) toolbar.classList.remove("hidden");

    console.log("✅ Admin mode enabled");

  } else {
    // ❌ ADMIN MODE DISABLE
    document.body.classList.remove("admin-mode");

    if (adminBar) adminBar.classList.add("hidden");
    if (toolbar) toolbar.classList.add("hidden");

    console.log("ℹ️ Public mode");
  }
});
