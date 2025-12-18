import { adminLogout } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

const logoutBtn = document.getElementById("adminLogoutBtn");

logoutBtn?.addEventListener("click", async () => {
  console.log("🚪 Admin logout");

  await adminLogout();

  localStorage.removeItem("ADMIN_MODE");
  setAdminMode(false);

  document.body.classList.remove("admin-mode");

  document.getElementById("adminLoginBtn")?.classList.remove("hidden");
  logoutBtn.classList.add("hidden");
});
