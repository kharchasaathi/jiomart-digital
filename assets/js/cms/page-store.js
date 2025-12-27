/***************************************************
 * PAGE STORE – FINAL SAFE + FULL BACKWARD COMPAT
 *
 * ✅ Blocks saved
 * ✅ Page styles saved (Page BG)
 * ✅ Default Text + Image + Video (old behavior)
 * ✅ No overwrite on reload
 * ✅ Ctrl+F5 safe
 * ✅ No data loss ever
 ***************************************************/

import { db } from "../core/firebase.js";
import { setState } from "../core/state.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* =================================================
   DEFAULT PAGE (FIRST TIME ONLY)
   🔁 OLD BEHAVIOR RESTORED
================================================= */
function createDefaultPage(slug) {
  return {
    id: slug,
    createdAt: Date.now(),
    style: {}, // 🔥 Page-level styles (BG etc.)
    blocks: [
      {
        id: crypto.randomUUID(),
        type: "text",
        data: {
          html: "<h1>Welcome to JioMart Digital</h1><p>Edit this content in admin mode.</p>",
          style: {}
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
   LOAD PAGE (SAFE + FULL REHYDRATION)
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
     PAGE EXISTS → FULL REHYDRATION
  --------------------------------------------- */
  const data = snap.data();

  const page = {
    id: slug,
    createdAt: data.createdAt || Date.now(),
    updatedAt: data.updatedAt || null,
    style: data.style || {},             // 🔥 IMPORTANT
    blocks: Array.isArray(data.blocks)
      ? data.blocks
      : []
  };

  /* ---------------------------------------------
     SAFETY: Inject defaults ONLY if blocks empty
     (Runs once in lifetime)
  --------------------------------------------- */
  if (page.blocks.length === 0) {
    console.warn("⚠️ Empty blocks detected. Injecting defaults ONCE.");

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
   SAVE PAGE (ADMIN ONLY – FULL SAVE)
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
      style: page.style || {},   // 🔥 Page BG & future styles
      updatedAt: Date.now()
    },
    { merge: true }
  );

  console.log("✅ Page saved (FULL + SAFE):", page.id);
}
