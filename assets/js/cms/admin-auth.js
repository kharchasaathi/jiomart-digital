/***************************************************
 * ADMIN AUTH HANDLER – PART–2
 * Handles:
 *  - Login button
 *  - Auth state
 *  - Admin-only access
 ***************************************************/

import { adminLogin, observeAuth, auth } from "./core/firebase.js";
import { signOut } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

/* ================================
   WAIT FOR DOM
================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* DOM Elements */
  const loginScreen = document.getElementById("loginScreen");
  const adminPanel = document.getElementById("adminPanel");
  const loginBtn = document.getElementById("loginBtn");

  if (!loginScreen || !adminPanel || !loginBtn) {
    console.error("❌ Admin Auth DOM elements missing");
    return;
  }

  /* ================================
     LOGIN BUTTON
  ================================ */
  loginBtn.addEventListener("click", async () => {
    await adminLogin();
  });

  /* ================================
     AUTH STATE OBSERVER
  ================================ */
  observeAuth((user) => {
    if (user) {
      loginScreen.classList.add("hidden");
      adminPanel.classList.remove("hidden");
    } else {
      loginScreen.classList.remove("hidden");
      adminPanel.classList.add("hidden");
    }
  });

  /* ================================
     SIDEBAR NAVIGATION
  ================================ */
  document.addEventListener("click", (e) => {

    const item = e.target.closest(".sidebar li");
    if (!item) return;

    const section = item.dataset.section;
    if (!section) return;

    /* LOGOUT */
    if (section === "logout") {
      signOut(auth).then(() => {
        loginScreen.classList.remove("hidden");
        adminPanel.classList.add("hidden");
      });
      return;
    }

    /* ACTIVE MENU */
    document.querySelectorAll(".sidebar li")
      .forEach(li => li.classList.remove("active"));
    item.classList.add("active");

    /* ACTIVE SECTION */
    document.querySelectorAll(".section")
      .forEach(sec => sec.classList.remove("active"));

    const targetSection = document.getElementById(section);
    if (targetSection) {
      targetSection.classList.add("active");
    }
  });

});

/* ================================
   DEBUG
================================ */
console.log("🔐 Admin Auth Handler Loaded");
