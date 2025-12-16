/***************************************************
 * PAGE BUILDER – ADMIN ONLY (SAFE VERSION)
 * - Public mode లో silently skip అవుతుంది
 * - JS execution break కాదు
 ***************************************************/

import { getState } from "../cms/state.js";
import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* ===============================
   ADMIN GUARD
================================ */

// 🔒 Always check live state
const state = getState();

if (!state.adminMode) {
  console.log("🚫 Page Builder skipped (public mode)");
  // ❌ No throw
  // ❌ No DOM touch
  // ✅ Just exit safely
} else {
  // ✅ ADMIN ONLY LOGIC

  async function loadPageSettings() {
    try {
      const ref = doc(db, "settings", "page");
      const snap = await getDoc(ref);

      if (!snap.exists()) return;

      const data = snap.data();

      if (data.title) {
        document.title = data.title;
      }

    } catch (err) {
      console.error("Page Builder Error:", err);
    }
  }

  loadPageSettings();
}
