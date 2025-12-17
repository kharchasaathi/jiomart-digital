
import { adminLogin, handleAdminRedirect } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn?.addEventListener("click", () => {
  adminLogin();
});

(async () => {
  const user = await handleAdminRedirect();
  if (user) {
    setAdminMode(true);
    sessionStorage.setItem("ADMIN_MODE", "true");
    window.location.href = "../index.html"; // 🔥 BACK TO PUBLIC
  }
})();
