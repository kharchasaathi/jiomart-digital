/***************************************************
 * ADMIN AUTH – EMAIL / PASSWORD
 ***************************************************/
import { auth } from "../core/firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const ADMIN_EMAIL = "abidalimohammad94@gmail.com";

console.log("🧩 admin-auth.js loaded (email/password)");

const loginBtn = document.getElementById("loginBtn");

/* ===============================
   LOGIN BUTTON (INSIDE BOX)
================================ */
loginBtn?.addEventListener("click", async () => {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value;

  if (!email || !password) {
    alert("Email & Password required");
    return;
  }

  try {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = result.user;

    if (user.email !== ADMIN_EMAIL) {
      alert("❌ Not authorized");
      return;
    }

    console.log("✅ Admin logged in:", user.email);

    localStorage.setItem("ADMIN_MODE", "true");

    // hide login box after success
    document.getElementById("adminLoginBox")?.style.setProperty("display", "none");

  } catch (err) {
    console.error("❌ Login failed:", err.message);
    alert(err.message);
  }
});

/* ===============================
   TOP NAV "ADMIN LOGIN" BUTTON
================================ */
document.getElementById("adminLoginBtn")?.addEventListener("click", () => {
  document.getElementById("adminLoginBox")?.style.setProperty("display", "block");
});
