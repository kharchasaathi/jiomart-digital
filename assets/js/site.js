/***************************************************
 * PUBLIC SITE THEME APPLIER – PART 3
 ***************************************************/

import { db } from "./firebase.js";
import {
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const siteRef = doc(db, "settings", "site");

onSnapshot(siteRef, (snap) => {
  if (!snap.exists()) return;

  const s = snap.data();

  document.documentElement.style.setProperty(
    "--primary-color",
    s.primaryColor || "#0a58ca"
  );

  document.documentElement.style.setProperty(
    "--font-en",
    s.fontEnglish || "Poppins"
  );

  document.documentElement.style.setProperty(
    "--font-te",
    s.fontTelugu || "Noto Sans Telugu"
  );
});
