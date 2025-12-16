/***************************************************
 * CMS STATE – PART 1
 * In-memory CMS state
 ***************************************************/

export const CMS_STATE = {
  page: null,
  isAdmin: false
};

export function setAdminMode(value) {
  CMS_STATE.isAdmin = value;
  console.log("🔐 Admin mode:", value);
}

export function setPage(page) {
  CMS_STATE.page = page;
  console.log("📄 Page loaded:", page.id);
}
