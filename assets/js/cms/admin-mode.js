import { auth } from "../core/firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

let CURRENT_MODE = null; // "admin" | "public"

document.addEventListener("DOMContentLoaded", () => {
  const adminBar = document.getElementById("adminBar");
  const toolbar = document.getElementById("editorToolbar");

  onAuthStateChanged(auth, (user) => {
    const nextMode = user ? "admin" : "public";

    // ⛔ prevent duplicate toggles
    if (CURRENT_MODE === nextMode) return;

    CURRENT_MODE = nextMode;

    if (user) {
      document.body.classList.add("admin-mode");
      document.body.classList.remove("public-mode");

      adminBar?.classList.remove("hidden");
      toolbar?.classList.remove("hidden");

      console.log("Admin mode ON");
    } else {
      document.body.classList.remove("admin-mode");
      document.body.classList.add("public-mode");

      adminBar?.classList.add("hidden");
      toolbar?.classList.add("hidden");

      console.log("Public mode");
    }
  });
});
