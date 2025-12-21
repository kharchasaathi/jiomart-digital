/***************************************************
 * ADMIN PRODUCTS – PHASE 3 (FINAL & STABLE)
 * ✔ Article Code
 * ✔ Store / DC products
 * ✔ Multiple image upload (Cloudinary)
 * ✔ Preview thumbnails
 * ✔ Duplicate article code prevention
 ***************************************************/

import { uploadToCloudinary } from "./media-cloudinary.js";
import { getState } from "../core/state.js";

/* ================================
   DOM ELEMENTS
================================ */
const productForm = document.getElementById("productForm");
const imageInput = document.getElementById("productImages");
const preview = document.getElementById("imagePreview");

/* ================================
   INIT CURRENT PRODUCT (DRAFT)
================================ */
function createEmptyProduct() {
  return {
    id: crypto.randomUUID(),

    // 🔥 ARTICLE CODE (KEY FIELD)
    articleCode: "",

    name: "",
    brand: "",
    category: "",
    price: 0,

    productType: "store", // store | dc

    store: {
      stock: 0
    },

    dc: {
      bookingPhone: "9705379219"
    },

    description: "",
    highlights: [],
    images: [],

    createdAt: Date.now()
  };
}

/* Create draft once */
const state = getState();
state.currentProduct ||= createEmptyProduct();

/* ================================
   IMAGE UPLOAD + PREVIEW
================================ */
imageInput.addEventListener("change", async () => {
  if (!state.currentProduct) return;

  preview.innerHTML = "";

  for (const file of imageInput.files) {
    const thumb = document.createElement("div");
    thumb.textContent = "Uploading...";
    thumb.className = "image-thumb";
    preview.appendChild(thumb);

    try {
      const url = await uploadToCloudinary(file);

      const img = document.createElement("img");
      img.src = url;
      img.style.width = "80px";
      img.style.height = "80px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "6px";

      thumb.innerHTML = "";
      thumb.appendChild(img);

      // 🔥 SAVE IMAGE INTO CURRENT PRODUCT
      state.currentProduct.images.push(url);

    } catch (err) {
      console.error("❌ Image upload failed", err);
      thumb.textContent = "Upload failed";
    }
  }
});

/* ================================
   SAVE PRODUCT
================================ */
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(productForm);

  const product = state.currentProduct;

  // 🔥 MAP FORM DATA
  product.articleCode = formData.get("articleCode")?.trim();
  product.name = formData.get("name");
  product.brand = formData.get("brand");
  product.category = formData.get("category");
  product.price = Number(formData.get("price"));
  product.productType = formData.get("productType");

  /* ================================
     VALIDATION
  ================================ */
  if (!product.articleCode) {
    alert("❌ Article Code is required");
    return;
  }

  state.products ||= [];

  const exists = state.products.some(
    p => p.articleCode === product.articleCode
  );

  if (exists) {
    alert("❌ Article Code already exists");
    return;
  }

  /* ================================
     SAVE
  ================================ */
  state.products.push(product);

  console.log("✅ Product saved:", product);

  alert("✅ Product added successfully");

  /* RESET FORM + DRAFT */
  productForm.reset();
  preview.innerHTML = "";
  state.currentProduct = createEmptyProduct();
});
