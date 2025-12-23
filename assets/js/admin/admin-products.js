import { getState } from "../core/state.js";
import { renderAdminProducts } from "./admin-products-list.js";

/* ===============================
   DOM ELEMENTS
================================ */
const form = document.getElementById("productForm");

const articleCode = document.getElementById("articleCode");
const name = document.getElementById("name");
const brand = document.getElementById("brand");
const category = document.getElementById("category");
const price = document.getElementById("price");
const productType = document.getElementById("productType");
const description = document.getElementById("description");
const imagePreview = document.getElementById("imagePreview");

/* ===============================
   SUBMIT PRODUCT (ADD / UPDATE)
================================ */
form.addEventListener("submit", e => {
  e.preventDefault();

  const state = getState();
  state.products ||= [];

  /* ===============================
     IMAGE + DATA DRAFT
     (from admin-media.js & admin-specs.js)
  ================================ */
  const draft = state.currentProduct || {
    images: [],
    highlights: [],
    specs: {}
  };

  /* ===============================
     BASIC VALIDATION
  ================================ */
  if (!articleCode.value.trim() || !name.value.trim()) {
    alert("❌ Article Code & Product Name required");
    return;
  }

  /* ===============================
     UPDATE MODE
  ================================ */
  if (state.editingProductId) {
    const product = state.products.find(
      p => p.id === state.editingProductId
    );

    if (!product) {
      alert("❌ Product not found");
      return;
    }

    /* Update fields */
    product.articleCode = articleCode.value.trim();
    product.name = name.value.trim();
    product.brand = brand.value.trim();
    product.category = category.value.trim();
    product.price = Number(price.value);
    product.productType = productType.value;
    product.description = description.value;

    product.images = draft.images;
    product.highlights = draft.highlights;
    product.specs = draft.specs;

    /* 🔥 NEW (PHASE 4.6 SAFETY) */
    product.visible = product.visible ?? true;
    product.featured = product.featured ?? false;

    alert("✅ Product updated");

    state.editingProductId = null;
  }

  /* ===============================
     ADD MODE
  ================================ */
  else {
    // ❌ Duplicate article code check
    if (
      state.products.some(
        p => p.articleCode === articleCode.value.trim()
      )
    ) {
      alert("❌ Article code already exists");
      return;
    }

    const product = {
      id: crypto.randomUUID(),

      articleCode: articleCode.value.trim(),
      name: name.value.trim(),
      brand: brand.value.trim(),
      category: category.value.trim(),
      price: Number(price.value),

      productType: productType.value, // store | dc
      description: description.value,

      images: draft.images,
      videos: [],                 // future ready
      highlights: draft.highlights,
      specs: draft.specs,

      /* 🔥 PHASE 4.6 */
      visible: true,
      featured: false,

      dc: {
        bookingPhone: "9705379219"
      },

      createdAt: Date.now()
    };

    state.products.push(product);
    alert("✅ Product added");
  }

  /* ===============================
     CLEANUP
  ================================ */
  state.currentProduct = null;
  form.reset();

  if (imagePreview) {
    imagePreview.innerHTML = "";
  }

  renderAdminProducts();

  console.log("🛒 PRODUCTS:", state.products);
});
