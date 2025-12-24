/***************************************************
 * ADMIN AUTH – EMAIL / PASSWORD (FINAL VERIFIED)
 ***************************************************/
import { auth } from "../core/firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ===============================
   CONFIG
================================ */
const ADMIN_EMAIL = "abidalimohammad94@gmail.com";

/* ===============================
   DOM ELEMENTS
================================ */
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

console.log("🧩 admin-auth.js loaded");

/* ===============================
   LOGIN HANDLER
================================ */
loginBtn?.addEventListener("click", async () => {
  const email = emailInput?.value.trim();
  const password = passwordInput?.value.trim();

  if (!email || !password) {
    alert("❌ Email & Password required");
    return;
  }

  try {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = result.user;

    /* 🔐 ADMIN EMAIL CHECK */
    if (user.email !== ADMIN_EMAIL) {
      alert("❌ Not authorized as admin");
      return;
    }

    console.log("✅ Admin logged in:", user.email);

    /* 🔥 ADMIN SESSION FLAG (CRITICAL) */
    localStorage.setItem("ADMIN_MODE", "true");

    alert("✅ Login successful");

    /* 🔥 REDIRECT */
    window.location.href = "admin.html";

  } catch (err) {
    console.error("❌ Login failed:", err);
    alert("❌ Invalid credentials");
  }
});
