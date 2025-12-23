import { getState } from "../core/state.js";

/* ===============================
   FEATURED PRODUCTS – HOME
================================ */
function renderFeaturedProducts() {
  const container = document.getElementById("featuredProducts");
  if (!container) return;

  const state = getState();

  /* 🔥 ONLY:
     - visible !== false
     - featured === true
  */
  const products = (state.products || [])
    .filter(p => p.visible !== false && p.featured);

  container.innerHTML = "";

  if (!products.length) {
    container.innerHTML = "<p>No featured products available</p>";
    return;
  }

  /* 🔥 Show only first 6 featured products */
  products.slice(0, 6).forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    /* ===============================
       PRICE TEXT (🔥 NEW)
    ================================ */
    const priceText =
      product.price
        ? `₹${product.price}`
        : "Contact for price";

    const badge =
      product.productType === "dc"
        ? `<span class="badge dc">DC</span>`
        : `<span class="badge store">Store</span>`;

    card.innerHTML = `
      <div class="product-image">
        ${
          product.images?.length
            ? `<img src="${product.images[0]}" alt="${product.name || "Product"}">`
            : `<div class="no-image">No Image</div>`
        }
      </div>

      <div class="product-info">
        ${badge}

        <h3>${product.name || "Unnamed Product"}</h3>

        <div class="article-code">
          Code: ${product.articleCode || "-"}
        </div>

        <div class="price">
          ${priceText}
        </div>
      </div>
    `;

    /* 🔥 CLICK → PRODUCT DETAIL PAGE */
    card.addEventListener("click", () => {
      if (!product.id) return;
      window.location.href = `product.html?id=${product.id}`;
    });

    container.appendChild(card);
  });

  console.log(
    "⭐ Featured products rendered:",
    products.length
  );
}

/* ===============================
   INIT
================================ */
document.addEventListener(
  "DOMContentLoaded",
  renderFeaturedProducts
);
