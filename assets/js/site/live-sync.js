/***************************************************
 * LIVE SYNC
 * Re-render page on state change
 ***************************************************/


import { renderPage } from "./render.js";

subscribe(() => {
  renderPage();
});
