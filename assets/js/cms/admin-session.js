import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🧩 admin-session.js loaded");

onAuthChange((user) => {
  if (user) {
    console.log("✅ Firebase user detected:", user.email);

    // Admin email check (extra safety)
    if (user.email === "abidalimohammad94@gmail.com") {
      localStorage.setItem("ADMIN_MODE", "true");
      setAdminMode(true);

      document.body.classList.add("admin-mode");
      document.getElementById("adminLoginBtn")?.classList.add("hidden");
      document.getElementById("adminLogoutBtn")?.classList.remove("hidden");
    }
  } else {
    console.log("🚪 Firebase auth logged out");

    localStorage.removeItem("ADMIN_MODE");
    setAdminMode(false);

    document.body.classList.remove("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.remove("hidden");
    document.getElementById("adminLogoutBtn")?.classList.add("hidden");
  }
});
