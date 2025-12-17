/***************************************************
 * CORE STATE – SINGLE SOURCE OF TRUTH
 ***************************************************/

const state = {
  adminMode: false,
  page: null,
  theme: {
    background: "#ffffff",
    primary: "#1a73e8",
    text: "#000000",
    font: "system-ui"
  }
};

export function getState() {
  return state;
}

export function setState(partial = {}) {
  Object.assign(state, partial);
}

export function setAdminMode(value) {
  state.adminMode = !!value;
  document.body.classList.toggle("admin-mode", state.adminMode);
}

export function isAdmin() {
  return state.adminMode;
}
