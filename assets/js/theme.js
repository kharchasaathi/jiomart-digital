/***************************************************
 * THEME MANAGER – ADMIN ONLY
 * File: assets/js/theme.js
 ***************************************************/

import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* ================================
   DOM ELEMENTS
================================ */
const primaryColor = document.getElementById("primaryColor");
const enFont = document.getElementById("fontEnglish");
const teFont = document.getElementById("fontTelugu");
const saveBtn = document.getElementById("saveTheme");

/* ================================
   SAFETY CHECK (PUBLIC vs ADMIN)
================================ */
if (!primaryColor || !enFont || !teFont || !saveBtn) {
  console.log("Theme.js loaded on public page – skipped");
} else {

  /* ================================
     FIRESTORE REF
  ================================ */
  const siteRef = doc(db, "settings", "site");

  /* ================================
     LOAD EXISTING THEME
  ================================ */
  async function loadTheme() {
    try {
      const snap = await getDoc(siteRef);
      if (snap.exists()) {
        const d = snap.data();
        primaryColor.value = d.primaryColor || "#0a58ca";
        enFont.value = d.fontEnglish || "Poppins";
        teFont.value = d.fontTelugu || "Noto Sans Telugu";
      }
    } catch (err) {
      console.error("❌ Theme load error:", err);
    }
  }

  /* ================================
     SAVE THEME (SAFE LISTENER)
  ================================ */
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      try {
        await setDoc(
          siteRef,
          {
            primaryColor: primaryColor.value,
            fontEnglish: enFont.value,
            fontTelugu: teFont.value,
            updatedAt: Date.now()
          },
          { merge: true }
        );

        alert("Theme updated successfully");
      } catch (err) {
        console.error("❌ Theme save error:", err);
        alert("Failed to update theme");
      }
    });
  }

  /* ================================
     INIT
  ================================ */
  loadTheme();
}
