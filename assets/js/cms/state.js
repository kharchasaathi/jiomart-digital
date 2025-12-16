
/***************************************************
 * CMS STATE – PART 4
 ***************************************************/

let state = {
  page: null,
  admin: false
};

const listeners = [];

export function setPage(page) {
  state.page = page;
  notify();
}

export function setAdminMode(val) {
  state.admin = val;
  notify();
}

export function isAdmin() {
  return state.admin;
}

export function getState() {
  return state;
}

export function subscribe(fn) {
  listeners.push(fn);
}

function notify() {
  listeners.forEach(fn => fn(state));
}
