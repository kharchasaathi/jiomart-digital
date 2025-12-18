import { adminLogout } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

const logoutBtn = document.getElementById("adminLogoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    console.log("🚪 Admin logout clicked");

    await adminLogout();

    sessionStorage.removeItem("ADMIN_MODE");
    setAdminMode(false);

    window.location.href = "../index.html";
  });
}
