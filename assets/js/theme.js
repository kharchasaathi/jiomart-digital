/***************************************************
 * ADMIN THEME EDITOR – PART 3
 * Controls:
 *  - Colors
 *  - Fonts (English + Telugu)
 *  - Live save to Firestore
 ***************************************************/

import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* Firestore ref */
const siteRef = doc(db, "settings", "site");

/* DOM */
const primaryColor = document.getElementById("primaryColor");
const enFont = document.getElementById("fontEnglish");
const teFont = document.getElementById("fontTelugu");
const saveBtn = document.getElementById("saveTheme");

/* Load existing settings */
async function loadTheme() {
  const snap = await getDoc(siteRef);
  if (snap.exists()) {
    const d = snap.data();
    primaryColor.value = d.primaryColor || "#0a58ca";
    enFont.value = d.fontEnglish || "Poppins";
    teFont.value = d.fontTelugu || "Noto Sans Telugu";
  }
}

/* Save theme */
saveBtn.addEventListener("click", async () => {
  await setDoc(siteRef, {
    primaryColor: primaryColor.value,
    fontEnglish: enFont.value,
    fontTelugu: teFont.value,
    updatedAt: Date.now()
  }, { merge: true });

  alert("Theme updated successfully");
});

loadTheme();
