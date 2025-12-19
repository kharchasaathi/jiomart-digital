/***************************************************
 * ADMIN TYPOGRAPHY PANEL – PHASE 2.2
 * Admin only • Live preview • Persisted
 ***************************************************/

import { isAdmin, getState, updateTheme } from "../core/state.js";

function initTypographyPanel() {
  if (!isAdmin()) return;

  const panel = document.getElementById("adminThemePanel");
  if (!panel) return;

  // Prevent duplicate UI
  if (panel.querySelector(".typography-section")) return;

  const { theme } = getState();

  const section = document.createElement("div");
  section.className = "typography-section";

  section.innerHTML = `
    <hr style="margin:12px 0"/>

    <div class="theme-panel-header">🔤 Typography</div>

    <label>
      Base Font Size (${theme.baseSize}px)
      <input
        type="range"
        id="fontSizeRange"
        min="12"
        max="22"
        step="1"
        value="${theme.baseSize}"
      />
    </label>

    <label>
      Line Height (${theme.lineHeight})
      <input
        type="range"
        id="lineHeightRange"
        min="1.2"
        max="2.0"
        step="0.05"
        value="${theme.lineHeight}"
      />
    </label>

    <label>
      Heading Scale (${theme.headingScale})
      <input
        type="range"
        id="headingScaleRange"
        min="1.1"
        max="1.6"
        step="0.05"
        value="${theme.headingScale}"
      />
    </label>
  `;

  panel.appendChild(section);

  /* ===============================
     BIND EVENTS
  ================================ */

  const fontSize = section.querySelector("#fontSizeRange");
  const lineHeight = section.querySelector("#lineHeightRange");
  const headingScale = section.querySelector("#headingScaleRange");

  fontSize.addEventListener("input", (e) => {
    updateTheme({ baseSize: Number(e.target.value) });
    e.target.previousElementSibling &&
      (e.target.previousElementSibling.textContent =
        `Base Font Size (${e.target.value}px)`);
  });

  lineHeight.addEventListener("input", (e) => {
    updateTheme({ lineHeight: Number(e.target.value) });
  });

  headingScale.addEventListener("input", (e) => {
    updateTheme({ headingScale: Number(e.target.value) });
  });
}

/* Init after DOM + admin mode */
document.addEventListener("DOMContentLoaded", initTypographyPanel);
