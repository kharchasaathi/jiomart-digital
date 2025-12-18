import { adminLogin } from "../core/firebase.js";

document.getElementById("loginBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await adminLogin(email, password);
    console.log("✅ Admin logged in");
  } catch (err) {
    alert("Login failed");
    console.error(err);
  }
});
