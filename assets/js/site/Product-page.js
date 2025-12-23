import { getState } from "../core/state.js";

/* ===============================
   GET PRODUCT ID
================================ */
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const container = document.getElementById("productDetail");

/* ===============================
   RENDER PRODUCT
================================ */
function renderProduct() {
  const state = getState();
  const products = state.products || [];

  const product = products.find(p => p.id === productId);

  if (!product) {
    container.innerHTML = "<p>Product not found</p>";
    return;
  }

  const images =
    product.images?.length
      ? product.images.map(
          img => `<img src="${img}" class="thumb">`
        ).join("")
      : `<div class="no-image">No Image</div>`;

  const action =
    product.productType === "dc"
      ? `<a class="call-btn" href="tel:${product.dc.bookingPhone}">
           📞 Call to Book
         </a>`
      : `<div class="store-note">
           Available in Store
         </div>`;

  container.innerHTML = `
    <div class="product-detail-grid">

      <div class="product-gallery">
        ${images}
      </div>

      <div class="product-detail-info">
        <h2>${product.name}</h2>

        <div class="article-code">
          Article Code: <strong>${product.articleCode}</strong>
        </div>

        <div class="price">₹${product.price}</div>

        <p>${product.description || ""}</p>

        ${action}
      </div>

    </div>
  `;
}

/* ===============================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", renderProduct);
