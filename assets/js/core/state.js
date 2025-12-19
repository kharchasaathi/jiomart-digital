/***************************************************
 * CORE STATE – SINGLE SOURCE OF TRUTH
 ***************************************************/

const THEME_STORAGE_KEY = "JIOMART_THEME";

const defaultTheme = {
  background: "#ffffff",
  primary: "#1a73e8",
  text: "#000000",
  font: "system-ui"
};

const state = {
  adminMode: false,
  page: null,

  // 🎨 THEME STATE
  theme: loadThemeFromStorage()
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
}

export function setAdminMode(value) {
  state.adminMode = !!value;
  document.body.classList.toggle("admin-mode", state.adminMode);
}

/* =================================================
   🔥 PHASE 1 — THEME ENGINE
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

  saveThemeToStorage();
  applyThemeToDOM();
}

/**
 * Apply theme state to CSS variables
 * (NO render, NO side effects)
 */
export function applyThemeToDOM() {
  const root = document.documentElement;
  const theme = state.theme;

  root.style.setProperty("--site-bg", theme.background);
  root.style.setProperty("--site-primary", theme.primary);
  root.style.setProperty("--site-text", theme.text);
  root.style.setProperty("--site-font", theme.font);
}

/* =================================================
   🔐 THEME PERSISTENCE (NEW)
================================================= */

function saveThemeToStorage() {
  try {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify(state.theme)
    );
  } catch (err) {
    console.warn("⚠️ Theme save failed", err);
  }
}

function loadThemeFromStorage() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved
      ? { ...defaultTheme, ...JSON.parse(saved) }
      : { ...defaultTheme };
  } catch {
    return { ...defaultTheme };
  }
}

/* ================================
   INIT (AUTO APPLY ON LOAD)
================================ */
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    applyThemeToDOM();
  });
}

/* ================================
   DEV ONLY (SAFE)
================================ */
if (typeof window !== "undefined") {
  window.__testTheme = updateTheme;
}
