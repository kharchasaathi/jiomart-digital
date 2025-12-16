/***************************************************
 * PAGE STORE – SAFE
 ***************************************************/
import { db } from "../core/firebase.js";
import { getState, setState } from "./state.js";

import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

export async function loadPage(slug) {
  const ref = doc(db, "pages", slug);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    console.warn("⚠️ Page not found:", slug);
    setState({ page: { blocks: [] } });
    return;
  }

  const data = snap.data();

  // ✅ ALWAYS normalize
  setState({
    page: {
      id: slug,
      blocks: Array.isArray(data.blocks) ? data.blocks : []
    }
  });
}

export async function savePage(page) {
  if (!page || !page.id) return;

  const ref = doc(db, "pages", page.id);
  await setDoc(ref, page, { merge: true });
}
