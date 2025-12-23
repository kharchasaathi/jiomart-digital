import { getState } from "../core/state.js";

/* ===============================
   DOM ELEMENTS
================================ */
const listContainer =
  document.getElementById("adminProductsList");

/* ===============================
   RENDER ADMIN PRODUCTS
================================ */
export function renderAdminProducts() {
  if (!listContainer) return;

  const state = getState();
  const products = state.products || [];

  listContainer.innerHTML = "";

  if (!products.length) {
    listContainer.innerHTML =
      "<p>No products added yet</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "admin-product-card";

    card.innerHTML = `
      <strong>${product.name}</strong>
      <div>Code: ${product.articleCode}</div>
      <div>Price: ₹${product.price ?? "-"}</div>
      <div>Type: ${product.productType}</div>

      <button data-edit>Edit</button>
      <button data-delete>Delete</button>
    `;

    /* ===============================
       EDIT
    ================================ */
    card
      .querySelector("[data-edit]")
      .addEventListener("click", () => {
        loadProductIntoForm(product.id);
      });

    /* ===============================
       DELETE
    ================================ */
    card
      .querySelector("[data-delete]")
      .addEventListener("click", () => {
        deleteProduct(product.id);
      });

    listContainer.appendChild(card);
  });
}

/* ===============================
   LOAD PRODUCT INTO FORM (EDIT)
================================ */
function loadProductIntoForm(productId) {
  const state = getState();
  const product = state.products.find(
    p => p.id === productId
  );

  if (!product) return;

  /* mark edit mode */
  state.editingProductId = productId;

  /* draft data for media + specs */
  state.currentProduct = {
    images: product.images || [],
    highlights: product.highlights || [],
    specs: product.specs || {}
  };

  /* fill form fields */
  articleCode.value = product.articleCode;
  name.value = product.name;
  brand.value = product.brand || "";
  category.value = product.category || "";
  price.value = product.price || "";
  productType.value = product.productType;
  description.value = product.description || "";

  /* image preview */
  const preview =
    document.getElementById("imagePreview");

  if (preview) {
    preview.innerHTML = "";
    product.images?.forEach(img => {
      const el = document.createElement("img");
      el.src = img;
      el.width = 80;
      el.height = 80;
      preview.appendChild(el);
    });
  }

  alert("✏️ Editing product: " + product.name);
}

/* ===============================
   DELETE PRODUCT
================================ */
function deleteProduct(productId) {
  const state = getState();

  if (!confirm("❌ Delete this product permanently?"))
    return;

  state.products = state.products.filter(
    p => p.id !== productId
  );

  /* cleanup edit state if deleting edited product */
  if (state.editingProductId === productId) {
    state.editingProductId = null;
    state.currentProduct = null;
  }

  renderAdminProducts();
  alert("❌ Product deleted");
}

/* ===============================
   INIT
================================ */
document.addEventListener(
  "DOMContentLoaded",
  renderAdminProducts
);
