import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

console.log("🧩 admin-session.js loaded");

const storedAdmin = localStorage.getItem("ADMIN_MODE");

if (storedAdmin === "true") {
  console.log("🛡 Admin session restored");
  setAdminMode(true);
  document.body.classList.add("admin-mode");
}

// 🔥 ONLY SYNC, NO OVERRIDE
onAuthChange((user) => {
  if (user) {
    console.log("🔐 Firebase auth active:", user.email);
    localStorage.setItem("ADMIN_MODE", "true");
    setAdminMode(true);
    document.body.classList.add("admin-mode");
  }
});
