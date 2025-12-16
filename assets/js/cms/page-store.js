/***************************************************
 * PAGE STORE – PART 1
 * Firestore page load / save
 ***************************************************/

import { db } from "../core/firebase.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import { createPage } from "./schema.js";
import { setPage } from "./state.js";

const COLLECTION = "pages";

/* Load page from Firestore */
export async function loadPage(pageId = "home") {
  const ref = doc(db, COLLECTION, pageId);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    setPage(snap.data());
    return snap.data();
  }

  // First time page
  const page = createPage(pageId);
  await setDoc(ref, page);
  setPage(page);
  return page;
}

/* Save page */
export async function savePage(page) {
  const ref = doc(db, COLLECTION, page.id);
  page.updatedAt = Date.now();
  await setDoc(ref, page);
  console.log("💾 Page saved");
}
