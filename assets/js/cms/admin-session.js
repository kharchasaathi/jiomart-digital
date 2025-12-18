/***************************************************
 * ADMIN SESSION – SINGLE SOURCE OF TRUTH
 ***************************************************/
import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";
import { renderPage } from "../cms/render.js";

console.log("🧩 admin-session.js loaded");

const ADMIN_EMAIL = "abidalimohammad94@gmail.com";

onAuthChange((user) => {
  const isAdmin = !!user && user.email === ADMIN_EMAIL;

  console.log("🔄 Auth state changed. Admin?", isAdmin);

  if (isAdmin) {
    localStorage.setItem("ADMIN_MODE", "true");
    setAdminMode(true);

    document.body.classList.add("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.add("hidden");
    document.getElementById("adminLogoutBtn")?.classList.remove("hidden");

    console.log("🛠️ Admin mode ENABLED");
  } else {
    localStorage.removeItem("ADMIN_MODE");
    setAdminMode(false);

    document.body.classList.remove("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.remove("hidden");
    document.getElementById("adminLogoutBtn")?.classList.add("hidden");

    console.log("👁️ Public mode");
  }

  // 🔥 CRITICAL: re-render after auth state is known
  renderPage();
});
