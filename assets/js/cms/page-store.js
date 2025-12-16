/***************************************************
 * PAGE STORE – PART 1 (UPDATED FOR PART–2)
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

/* ===============================
   LOAD PAGE
================================ */
export async function loadPage(pageId = "home") {
  const ref = doc(db, COLLECTION, pageId);
  const snap = await getDoc(ref);

  /* If page already exists */
  if (snap.exists()) {
    const page = snap.data();
    setPage(page);
    return page;
  }

  /* 🔥 First-time page creation with default block */
  const page = createPage(pageId);

  page.blocks.push({
    id: "blk_welcome",
    type: "text",
    data: {
      html: "<h1>Welcome to JioMart Digital</h1><p>Click here to edit</p>"
    }
  });

  await setDoc(ref, page);
  setPage(page);
  return page;
}

/* ===============================
   SAVE PAGE
================================ */
export async function savePage(page) {
  const ref = doc(db, COLLECTION, page.id);
  page.updatedAt = Date.now();
  await setDoc(ref, page);
  console.log("💾 Page saved");
}
