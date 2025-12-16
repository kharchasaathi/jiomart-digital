/***************************************************
 * PAGE STORE – SAFE + AUTO INIT
 ***************************************************/
import { db } from "../core/firebase.js";
import { getState, setState } from "./state.js";

import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* -------------------------------
   Default page structure
-------------------------------- */
function createDefaultPage(slug) {
  return {
    id: slug,
    blocks: [
      {
        id: crypto.randomUUID(),
        type: "text",
        data: {
          html: "<h1>Welcome to JioMart Digital</h1><p>Edit this content in admin mode.</p>"
        }
      }
    ]
  };
}

/* -------------------------------
   Load page safely
-------------------------------- */
export async function loadPage(slug) {
  const ref = doc(db, "pages", slug);
  const snap = await getDoc(ref);

  // ❌ Page does NOT exist → create it
  if (!snap.exists()) {
    console.warn("⚠️ Page not found. Creating new page:", slug);

    const newPage = createDefaultPage(slug);
    await setDoc(ref, newPage);

    setState({ page: newPage });
    return;
  }

  // ✅ Page exists
  const data = snap.data();

  let page = {
    id: slug,
    blocks: Array.isArray(data.blocks) ? data.blocks : []
  };

  // ⚠️ Page exists but NO blocks → auto add one
  if (page.blocks.length === 0) {
    console.warn("⚠️ Page empty. Injecting default block.");

    page.blocks = createDefaultPage(slug).blocks;
    await setDoc(ref, page, { merge: true });
  }

  setState({ page });
}

/* -------------------------------
   Save page
-------------------------------- */
export async function savePage(page) {
  if (!page || !page.id) return;

  const ref = doc(db, "pages", page.id);
  await setDoc(ref, page, { merge: true });

  console.log("✅ Page saved:", page.id);
}
