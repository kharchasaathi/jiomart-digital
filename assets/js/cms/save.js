/***************************************************
 * SAVE HANDLER – PART 3
 * Saves CMS page to Firestore
 ***************************************************/

import { CMS_STATE } from "./state.js";
import { savePage } from "./page-store.js";

export function initSaveHandler() {
  document.addEventListener("cms-save", async () => {
    if (!CMS_STATE.isAdmin) return;
    await savePage(CMS_STATE.page);
    alert("✅ Content saved");
  });
}
