/***************************************************
 * EDITOR TOOLBAR – CLEANED (TEXT TOOLBAR REMOVED)
 * ✔ Floating text toolbar COMPLETELY DISABLED
 * ✔ Safe admin state sync preserved
 * ✔ No selection / execCommand / positioning
 ***************************************************/

let toolbar = null;

/* ===============================
   ADMIN STATE LISTENER
================================ */
document.addEventListener("ADMIN_STATE_CHANGED", e => {
  const admin =
    !!(e.detail?.adminMode ?? e.detail?.isAdmin);

  console.log(
    "🔕 Text toolbar disabled (editor-toolbar.js). Admin:",
    admin
  );

  // SAFETY: remove any leftover toolbar if exists
  if (!admin && toolbar) {
    toolbar.remove();
    toolbar = null;
  }
});

/* ===============================
   NOTE
================================
❌ Floating text toolbar REMOVED
❌ Selection based editor REMOVED
❌ execCommand REMOVED

✅ Block-attached text toolbar is handled ONLY by:
   admin-text-toolbar.js
================================ */
