/***************************************************
 * PAGE STORE – FINAL SAFE + NO DATA LOSS
 *
 * ✅ Never overwrites existing blocks
 * ✅ Safe on Ctrl+F5 / hard reload
 * ✅ Default blocks injected ONLY ONCE
 * ✅ No render / auth dependency
 ***************************************************/

import { db } from "../core/firebase.js";
import { getState, setState } from "../core/state.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* =================================================
   DEFAULT PAGE (FIRST TIME ONLY)
================================================= */
function createDefaultPage(slug) {
  return {
    id: slug,
    createdAt: Date.now(),
    blocks: [
      {
        id: crypto.randomUUID(),
        type: "text",
        data: {
          html: "<h1>Welcome to JioMart Digital</h1><p>Edit this content in admin mode.</p>"
        }
      },
      {
        id: crypto.randomUUID(),
        type: "image",
        data: {}
      },
      {
        id: crypto.randomUUID(),
        type: "video",
        data: {}
      }
    ]
  };
}

/* =================================================
   LOAD PAGE (🔥 SAFE & NON-DESTRUCTIVE)
================================================= */
export async function loadPage(slug) {
  if (!slug) throw new Error("loadPage: slug missing");

  const ref = doc(db, "pages", slug);
  const snap = await getDoc(ref);

  /* ---------------------------------------------
     PAGE DOES NOT EXIST → CREATE ONCE
  --------------------------------------------- */
  if (!snap.exists()) {
    console.warn("⚠️ Page not found. Creating new page:", slug);

    const newPage = createDefaultPage(slug);
    await setDoc(ref, newPage);

    setState({ page: newPage });
    return newPage;
  }

  /* ---------------------------------------------
     PAGE EXISTS → USE AS IS
  --------------------------------------------- */
  const data = snap.data();

  const page = {
    id: slug,
    createdAt: data.createdAt || Date.now(),
    blocks: Array.isArray(data.blocks) ? data.blocks : []
  };

  /* ---------------------------------------------
     SAFETY: Inject default blocks ONLY if empty
     (This runs once in lifetime)
  --------------------------------------------- */
  if (page.blocks.length === 0) {
    console.warn("⚠️ Existing page has no blocks. Injecting defaults ONCE.");

    const defaults = createDefaultPage(slug).blocks;
    page.blocks = defaults;

    await setDoc(
      ref,
      { blocks: defaults },
      { merge: true }
    );
  }

  setState({ page });
  return page;
}

/* =================================================
   SAVE PAGE (ADMIN ONLY)
================================================= */
export async function savePage(page) {
  if (!page || !page.id) {
    console.warn("❌ savePage: invalid page");
    return;
  }

  const ref = doc(db, "pages", page.id);

  await setDoc(
    ref,
    {
      blocks: page.blocks,
      updatedAt: Date.now()
    },
    { merge: true }
  );

  console.log("✅ Page saved:", page.id);
}
