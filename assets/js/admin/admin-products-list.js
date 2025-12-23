import { getState } from "../core/state.js";

const list = document.getElementById("adminProductsList");
const form = document.getElementById("productForm");

/* ===============================
   RENDER PRODUCTS LIST
================================ */
export function renderAdminProducts() {
  if (!list) return;

  const state = getState();
  const products = state.products || [];

  list.innerHTML = "";

  if (!products.length) {
    list.innerHTML = "<p>No products added yet</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "admin-product-card";

    card.innerHTML = `
      <strong>${product.name}</strong>
      <div>Code: ${product.articleCode}</div>
      <div>₹${product.price}</div>

      <button data-edit>Edit</button>
      <button data-delete>Delete</button>
    `;

    /* EDIT */
    card.querySelector("[data-edit]").onclick = () => {
      loadProductIntoForm(product);
    };

    /* DELETE */
    card.querySelector("[data-delete]").onclick = () => {
      if (!confirm("Delete this product?")) return;

      state.products = state.products.filter(
        p => p.id !== product.id
      );

      renderAdminProducts();
      alert("❌ Product deleted");
    };

    list.appendChild(card);
  });
}

/* ===============================
   LOAD PRODUCT INTO FORM
================================ */
function loadProductIntoForm(product) {
  const state = getState();
  state.editingProductId = product.id;

  articleCode.value = product.articleCode;
  name.value = product.name;
  brand.value = product.brand;
  category.value = product.category;
  price.value = product.price;
  productType.value = product.productType;
  description.value = product.description || "";

  /* Images */
  state.currentProduct = {
    images: product.images || [],
    highlights: product.highlights || [],
    specs: product.specs || {}
  };

  document.getElementById("imagePreview").innerHTML =
    product.images?.map(
      img => `<img src="${img}" width="60" />`
    ).join("");

  alert("✏️ Editing product: " + product.name);
}

/* INIT */
document.addEventListener("DOMContentLoaded", renderAdminProducts);
