/***************************************************
 * ADMIN TYPOGRAPHY PANEL – PHASE 1.5
 ***************************************************/

import { isAdmin, updateTheme, getState } from "../core/state.js";

function createTypographyPanel() {
  if (!isAdmin()) return;
  if (document.getElementById("adminTypographyPanel")) return;

  const panel = document.createElement("div");
  panel.id = "adminTypographyPanel";

  panel.innerHTML = `
    <div class="theme-panel-header">🔤 Typography</div>

    <label>
      Base Font Size
      <input type="range" min="12" max="22" step="1" id="baseSize">
    </label>

    <label>
      Line Height
      <input type="range" min="1.2" max="2.2" step="0.1" id="lineHeight">
    </label>

    <label>
      Heading Scale
      <input type="range" min="1.1" max="1.6" step="0.05" id="headingScale">
    </label>
  `;

  document.body.appendChild(panel);

  const { theme } = getState();

  panel.querySelector("#baseSize").value = theme.baseSize;
  panel.querySelector("#lineHeight").value = theme.lineHeight;
  panel.querySelector("#headingScale").value = theme.headingScale;

  panel.querySelector("#baseSize").addEventListener("input", e =>
    updateTheme({ baseSize: Number(e.target.value) })
  );

  panel.querySelector("#lineHeight").addEventListener("input", e =>
    updateTheme({ lineHeight: Number(e.target.value) })
  );

  panel.querySelector("#headingScale").addEventListener("input", e =>
    updateTheme({ headingScale: Number(e.target.value) })
  );
}

document.addEventListener("DOMContentLoaded", createTypographyPanel);
