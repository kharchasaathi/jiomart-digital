import { getState } from "../core/state.js";

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
   SUBMIT PRODUCT
================================ */
form.addEventListener("submit", e => {
  e.preventDefault();

  const state = getState();
  state.products ||= [];

  /* ===============================
     IMAGE DRAFT (FROM admin-media.js)
  ================================ */
  const draft = state.currentProduct || {};
  const images = draft.images || [];

  /* ===============================
     PRODUCT OBJECT
  ================================ */
  const product = {
    id: crypto.randomUUID(),

    articleCode: articleCode.value.trim(),
    name: name.value.trim(),
    brand: brand.value.trim(),
    category: category.value.trim(),
    price: Number(price.value),

    productType: productType.value, // store | dc
    description: description.value,

    images,
    videos: [],        // future ready
    highlights: [],    // phase 3.5+
    specs: {},         // phase 3.5+

    dc: {
      bookingPhone: "9705379219"
    },

    createdAt: Date.now()
  };

  /* ===============================
     VALIDATIONS
  ================================ */
  if (!product.articleCode || !product.name) {
    alert("❌ Article Code & Product Name required");
    return;
  }

  // ❌ Duplicate article code
  if (state.products.some(p => p.articleCode === product.articleCode)) {
    alert("❌ Article code already exists");
    return;
  }

  /* ===============================
     SAVE PRODUCT
  ================================ */
  state.products.push(product);

  /* ===============================
     CLEANUP
  ================================ */
  state.currentProduct = null; // clear image draft
  form.reset();

  if (imagePreview) {
    imagePreview.innerHTML = "";
  }

  alert("✅ Product saved successfully");

  console.log("🛒 PRODUCTS:", state.products);
});
