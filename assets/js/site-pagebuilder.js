/***************************************************
 * PAGE BUILDER – ADMIN ONLY
 ***************************************************/
import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

async function loadPageSettings() {
  try {
    const ref = doc(db, "settings", "page");
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const data = snap.data();

    if (data.title) document.title = data.title;

  } catch (err) {
    console.error("Page Builder Error:", err);
  }
}

loadPageSettings();
