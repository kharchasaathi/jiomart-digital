/***************************************************
 * ADMIN AUTH HANDLER – PART–2
 * Handles:
 *  - Login button
 *  - Auth state
 *  - Admin-only access
 ***************************************************/

import { adminLogin, observeAuth, auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

/* DOM Elements */
const loginScreen = document.getElementById("loginScreen");
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("loginBtn");

/* Login button */
loginBtn.addEventListener("click", async () => {
  await adminLogin();
});

/* Observe auth state */
observeAuth((user) => {
  if (user) {
    loginScreen.classList.add("hidden");
    adminPanel.classList.remove("hidden");
  } else {
    loginScreen.classList.remove("hidden");
    adminPanel.classList.add("hidden");
  }
});

/* Sidebar navigation */
document.addEventListener("click", (e) => {
  if (e.target.matches(".sidebar li")) {

    const section = e.target.dataset.section;

    if (section === "logout") {
      signOut(auth);
      return;
    }

    document.querySelectorAll(".sidebar li")
      .forEach(li => li.classList.remove("active"));
    e.target.classList.add("active");

    document.querySelectorAll(".section")
      .forEach(sec => sec.classList.remove("active"));

    document.getElementById(section).classList.add("active");
  }
});
