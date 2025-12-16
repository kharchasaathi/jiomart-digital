/***************************************************
 * CMS STATE – SINGLE SOURCE OF TRUTH
 ***************************************************/

const state = {
  adminMode: false,
  page: null
};

/* Get full state */
export function getState() {
  return state;
}

/* Set partial state safely */
export function setState(partial) {
  if (!partial || typeof partial !== "object") return;

  Object.assign(state, partial);
}

/* Admin mode helpers */
export function setAdminMode(value) {
  state.adminMode = !!value;

  if (state.adminMode) {
    document.body.classList.add("admin-mode");
  } else {
    document.body.classList.remove("admin-mode");
  }
}

export function isAdmin() {
  return state.adminMode === true;
}
