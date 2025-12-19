/***************************************************
 * CORE STATE – SINGLE SOURCE OF TRUTH
 ***************************************************/

const state = {
  adminMode: false,
  page: null,

  // 🎨 THEME STATE
  theme: {
    background: "#ffffff",
    primary: "#1a73e8",
    text: "#000000",
    font: "system-ui"
  }
};

/* ================================
   GETTERS
================================ */
export function getState() {
  return state;
}

export function isAdmin() {
  return state.adminMode;
}

/* ================================
   SETTERS
================================ */
export function setState(partial = {}) {
  Object.assign(state, partial);

  // 🔥 Phase 1.2 — sync theme if updated via setState
  if (partial.theme) {
    applyThemeToDOM();
  }
}

export function setAdminMode(value) {
  state.adminMode = !!value;
  document.body.classList.toggle("admin-mode", state.adminMode);
}

/* =================================================
   🔥 PHASE 1.1 — THEME UPDATE LOGIC
================================================= */

/**
 * Update one or more theme values safely
 * @param {Object} themeUpdates
 */
export function updateTheme(themeUpdates = {}) {
  if (!themeUpdates || typeof themeUpdates !== "object") return;

  state.theme = {
    ...state.theme,
    ...themeUpdates
  };

  applyThemeToDOM();
}

/**
 * Apply theme state to CSS variables
 * (NO re-render, NO logic side effects)
 */
export function applyThemeToDOM() {
  const root = document.documentElement;
  const theme = state.theme;

  if (!root || !theme) return;

  root.style.setProperty("--site-bg", theme.background);
  root.style.setProperty("--site-primary", theme.primary);
  root.style.setProperty("--site-text", theme.text);
  root.style.setProperty("--site-font", theme.font);
}

/* =================================================
   🔧 DEV ONLY — Console Testing Helper
================================================= */
if (typeof window !== "undefined") {
  window.__testTheme = updateTheme;
}

/* =================================================
   🔥 PHASE 1.2 — INITIAL THEME SYNC ON LOAD
================================================= */
document.addEventListener("DOMContentLoaded", () => {
  applyThemeToDOM();
});
