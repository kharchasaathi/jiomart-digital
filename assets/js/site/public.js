/***************************************************
 * PUBLIC ENTRY – NO ADMIN CODE
 ***************************************************/

import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";
import { setAdminMode } from "../cms/state.js";

// 🔒 Force public mode
setAdminMode(false);

(async function initPublic() {
  await loadPage("home");
  renderPage();
})();
