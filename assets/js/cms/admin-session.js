/***************************************************
 * ADMIN SESSION – SINGLE SOURCE OF TRUTH (FINAL)
 ***************************************************/
import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🧩 admin-session.js loaded");

const ADMIN_EMAIL = "abidalimohammad94@gmail.com";

onAuthChange((user) => {
  const isAdmin = !!user && user.email === ADMIN_EMAIL;

  console.log("🔄 Auth state changed. Admin?", isAdmin);

  setAdminMode(isAdmin);

  if (isAdmin) {
    document.body.classList.add("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.add("hidden");
    document.getElementById("adminLogoutBtn")?.classList.remove("hidden");
  } else {
    document.body.classList.remove("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.remove("hidden");
    document.getElementById("adminLogoutBtn")?.classList.add("hidden");
  }

  // 🔥 ONLY ONE EVENT – FINAL
  document.dispatchEvent(
    new CustomEvent("ADMIN_STATE_CHANGED", {
      detail: { isAdmin }
    })
  );

  console.log("📢 ADMIN_STATE_CHANGED dispatched:", isAdmin);
});
