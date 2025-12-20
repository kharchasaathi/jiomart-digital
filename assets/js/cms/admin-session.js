/***************************************************
 * ADMIN SESSION – SINGLE SOURCE OF TRUTH (FINAL)
 * ✔ Auth listener only
 * ✔ State update only
 * ✔ Event dispatch only
 * ❌ No render
 * ❌ No UI DOM handling
 ***************************************************/
import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🧩 admin-session.js loaded");

const ADMIN_EMAIL = "abidalimohammad94@gmail.com";

onAuthChange((user) => {
  const isAdmin = !!user && user.email === ADMIN_EMAIL;

  console.log("🔄 Auth state changed. Admin?", isAdmin);

  // 1️⃣ Update global state
  setAdminMode(isAdmin);

  // 2️⃣ Persist for refresh safety (optional but useful)
  if (isAdmin) {
    localStorage.setItem("ADMIN_MODE", "true");
    document.body.classList.add("admin-mode");
    console.log("🛠️ Admin mode ENABLED");
  } else {
    localStorage.removeItem("ADMIN_MODE");
    document.body.classList.remove("admin-mode");
    console.log("👁️ Public mode");
  }

  // 3️⃣ 🔔 Notify rest of the app (CRITICAL)
  document.dispatchEvent(
    new CustomEvent("ADMIN_STATE_READY", {
      detail: { isAdmin }
    })
  );

  console.log("🔔 ADMIN_STATE_READY dispatched:", isAdmin);
});
