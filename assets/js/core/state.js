/***************************************************
 * CORE STATE – SINGLE SOURCE OF TRUTH
 ***************************************************/

/* ================================
   STORAGE KEYS
================================ */
const THEME_STORAGE_KEY = "JIOMART_THEME";
const LANGUAGE_STORAGE_KEY = "JIOMART_LANG";

/* ================================
   DEFAULT THEME
================================ */
const defaultTheme = {
  background: "#ffffff",
  primary: "#1a73e8",
  text: "#000000",
  font: "system-ui",

  /* 🅣 TYPOGRAPHY (PHASE 1.5) */
  baseSize: 16,        // px
  lineHeight: 1.6,     // unitless
  headingScale: 1.25   // multiplier
};

/* ================================
   CORE STATE
================================ */
const state = {
  adminMode: false,
  page: null,

  // 🎨 THEME STATE
  theme: loadThemeFromStorage(),

  // 🌐 LANGUAGE STATE (PHASE 2.3)
  language: loadLanguageFromStorage() // "en" | "te"
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

export function getLanguage() {
  return state.language;
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
   🎨 THEME + TYPOGRAPHY ENGINE
================================================= */

/**
 * Update one or more theme / typography values safely
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
 * Apply theme + typography to CSS variables
 * (NO render, NO side effects)
 */
export function applyThemeToDOM() {
  const root = document.documentElement;
  const t = state.theme;

  /* 🎨 COLORS */
  root.style.setProperty("--site-bg", t.background);
  root.style.setProperty("--site-primary", t.primary);
  root.style.setProperty("--site-text", t.text);

  /* 🔤 FONT */
  root.style.setProperty("--site-font", t.font);

  /* 🅣 TYPOGRAPHY */
  root.style.setProperty("--base-font-size", `${t.baseSize}px`);
  root.style.setProperty("--line-height", t.lineHeight);
  root.style.setProperty("--heading-scale", t.headingScale);
}

/* =================================================
   🌐 LANGUAGE SYSTEM (PHASE 2.3)
================================================= */

export function setLanguage(lang) {
  if (lang !== "en" && lang !== "te") return;

  state.language = lang;

  document.documentElement.setAttribute("lang", lang);
  document.body.setAttribute("data-lang", lang);

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {}

  applyLanguageFont();
}

function applyLanguageFont() {
  if (state.language === "te") {
    document.documentElement.style.setProperty(
      "--site-font",
      "'Noto Sans Telugu', system-ui"
    );
  } else {
    document.documentElement.style.setProperty(
      "--site-font",
      state.theme.font || "system-ui"
    );
  }
}

/* =================================================
   🔐 THEME PERSISTENCE
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

/* =================================================
   🌐 LANGUAGE PERSISTENCE
================================================= */
function loadLanguageFromStorage() {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) || "en";
  } catch {
    return "en";
  }
}

/* ================================
   INIT – AUTO APPLY (THEME + LANG)
================================ */
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    applyThemeToDOM();
    setLanguage(state.language);
  });
}

/* ================================
   DEV ONLY (SAFE)
================================ */
if (typeof window !== "undefined") {
  window.__testTheme = updateTheme;
  window.__testLang = setLanguage;
}
