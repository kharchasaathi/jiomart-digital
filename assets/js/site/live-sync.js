/***************************************************
 * LIVE SYNC
 * Re-render page on state change
 ***************************************************/

import { subscribe } from "../cms/state.js";
import { renderPage } from "./render.js";

subscribe(() => {
  renderPage();
});
