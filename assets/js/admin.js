/***************************************************
 * ADMIN ENTRY – FINAL
 ***************************************************/
import { auth } from "./core/firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { setAdminMode } from "./cms/state.js";
import { loadPage } from "./cms/page-store.js";
import { renderPage } from "./cms/render.js";

// admin tools
import "./cms/live-edit.js";
import "./cms/editor-toolbar.js";
import "./cms/save.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "/admin.html";
    return;
  }

  console.log("✅ Admin authenticated");

  setAdminMode(true);

  await loadPage("home");

  renderPage();

  console.log("✅ Admin page rendered");
});
