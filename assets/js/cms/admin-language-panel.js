/***************************************************
 * ADMIN LANGUAGE PANEL – PHASE 2.3
 ***************************************************/

import { isAdmin, getLanguage, setLanguage } from "../core/state.js";

function createLanguagePanel() {
  if (!isAdmin()) return;
  if (document.getElementById("adminLanguagePanel")) return;

  const panel = document.createElement("div");
  panel.id = "adminLanguagePanel";

  panel.innerHTML = `
    <div class="theme-panel-header">🌐 Language</div>

    <label>
      <select id="siteLanguage">
        <option value="en">English</option>
        <option value="te">తెలుగు</option>
      </select>
    </label>
  `;

  document.body.appendChild(panel);

  const select = panel.querySelector("#siteLanguage");
  select.value = getLanguage();

  select.addEventListener("change", e => {
    setLanguage(e.target.value);
  });
}

document.addEventListener("DOMContentLoaded", createLanguagePanel);
