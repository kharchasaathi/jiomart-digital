/***************************************************
 * CMS INIT – PAGE STYLES + PAGE TOOLBAR
 ***************************************************/

import { applyPageStyles } from "./page-style.js";
import { initPageStyleToolbar } from "../admin/page-style-toolbar.js";

/* ===============================
   CMS BOOTSTRAP
================================ */
document.addEventListener("DOMContentLoaded", () => {
  applyPageStyles();
  initPageStyleToolbar();
});
