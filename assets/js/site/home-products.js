import { getState } from "../core/state.js";

/* ===============================
   FEATURED PRODUCTS – HOME
================================ */
function renderFeaturedProducts() {
  const container = document.getElementById("featuredProducts");
  if (!container) return;

  const state = getState();
  const products = state.products || [];

  container.innerHTML = "";

  if (!products.length) {
    container.innerHTML = "<p>No products available</p>";
    return;
  }

  // 🔥 Show only first 6 products
  products.slice(0, 6).forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    const badge =
      product.productType === "dc"
        ? `<span class="badge dc">DC</span>`
        : `<span class="badge store">Store</span>`;

    card.innerHTML = `
      <div class="product-image">
        ${
          product.images?.length
            ? `<img src="${product.images[0]}" alt="${product.name}">`
            : `<div class="no-image">No Image</div>`
        }
      </div>

      <div class="product-info">
        ${badge}

        <h3>${product.name}</h3>

        <div class="article-code">
          Code: ${product.articleCode}
        </div>

        <div class="price">₹${product.price}</div>
      </div>
    `;

    container.appendChild(card);
  });
}

/* INIT */
document.addEventListener("DOMContentLoaded", renderFeaturedProducts);
