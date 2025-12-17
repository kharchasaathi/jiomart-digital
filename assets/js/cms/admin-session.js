import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🛡 admin-session.js loaded");

onAuthChange((user) => {
  if (user) {
    console.log("✅ Admin session detected:", user.email);

    setAdminMode(true);
    document.body.classList.add("admin-mode");

    sessionStorage.setItem("ADMIN_MODE", "true");
  } else {
    console.log("ℹ️ No admin session");

    setAdminMode(false);
    document.body.classList.remove("admin-mode");

    sessionStorage.removeItem("ADMIN_MODE");
  }
});
