/***************************************************
 * CMS INIT – PAGE STYLES ONLY
 * ✔ Page styles apply on load
 * ✔ NO page-style-toolbar
 ***************************************************/

import { applyPageStyles } from "./page-style.js";

/* ===============================
   CMS BOOTSTRAP
================================ */
document.addEventListener("DOMContentLoaded", () => {
  applyPageStyles();
});
