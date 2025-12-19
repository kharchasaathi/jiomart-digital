/***************************************************
 * ADMIN THEME PANEL – PHASE 1.4
 * Admin only • Live preview • Safe
 ***************************************************/

import { isAdmin, updateTheme, getState } from "../core/state.js";

function createThemePanel() {
  if (!isAdmin()) return;

  // Prevent duplicate panel
  if (document.getElementById("adminThemePanel")) return;

  const panel = document.createElement("div");
  panel.id = "adminThemePanel";

  panel.innerHTML = `
    <div class="theme-panel-header">🎨 Theme Settings</div>

    <label>
      Background
      <input type="color" id="themeBg" />
    </label>

    <label>
      Primary
      <input type="color" id="themePrimary" />
    </label>

    <label>
      Text
      <input type="color" id="themeText" />
    </label>

    <label>
      Font
      <select id="themeFont">
        <option value="system-ui">System</option>
        <option value="Poppins">Poppins</option>
        <option value="Inter">Inter</option>
        <option value="Noto Sans Telugu">Telugu – Noto</option>
        <option value="Ramabhadra">Telugu – Ramabhadra</option>
      </select>
    </label>
  `;

  document.body.appendChild(panel);

  const { theme } = getState();

  // Init values
  panel.querySelector("#themeBg").value = theme.background;
  panel.querySelector("#themePrimary").value = theme.primary;
  panel.querySelector("#themeText").value = theme.text;
  panel.querySelector("#themeFont").value = theme.font;

  // Bind updates
  panel.querySelector("#themeBg")
    .addEventListener("input", e =>
      updateTheme({ background: e.target.value })
    );

  panel.querySelector("#themePrimary")
    .addEventListener("input", e =>
      updateTheme({ primary: e.target.value })
    );

  panel.querySelector("#themeText")
    .addEventListener("input", e =>
      updateTheme({ text: e.target.value })
    );

  panel.querySelector("#themeFont")
    .addEventListener("change", e =>
      updateTheme({ font: e.target.value })
    );
}

/* Init after DOM ready */
document.addEventListener("DOMContentLoaded", createThemePanel);
