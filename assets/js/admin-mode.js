import { auth } from "../core/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const adminBar = document.getElementById("adminBar");

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.body.classList.add("admin-mode");
    adminBar.classList.remove("hidden");
  } else {
    document.body.classList.remove("admin-mode");
    adminBar.classList.add("hidden");
  }
});
