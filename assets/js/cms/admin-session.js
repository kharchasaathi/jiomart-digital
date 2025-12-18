import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

const ADMIN_EMAIL = "abidalimohammad94@gmail.com";

console.log("🧩 admin-session.js loaded");

onAuthChange((user) => {
  const isAdmin = !!user && user.email === ADMIN_EMAIL;

  if (isAdmin) {
    console.log("✅ Admin session confirmed:", user.email);
    localStorage.setItem("ADMIN_MODE", "true");
    setAdminMode(true);

    document.body.classList.add("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.add("hidden");
    document.getElementById("adminLogoutBtn")?.classList.remove("hidden");
  } else {
    console.log("👁 Public session active");
    localStorage.removeItem("ADMIN_MODE");
    setAdminMode(false);

    document.body.classList.remove("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.remove("hidden");
    document.getElementById("adminLogoutBtn")?.classList.add("hidden");
  }

  // 🔥 TELL APP TO RE-RENDER
  window.dispatchEvent(new Event("ADMIN_STATE_CHANGED"));
});
