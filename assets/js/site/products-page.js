import { getState } from "../core/state.js";

/* ===============================
   RENDER PRODUCTS (PUBLIC)
================================ */
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const state = getState();
  const products = state.products || [];

  grid.innerHTML = "";

  if (!products.length) {
    grid.innerHTML = "<p>No products available</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    const badge =
      product.productType === "dc"
        ? `<span class="badge dc">DC Product</span>`
        : `<span class="badge store">Store Product</span>`;

    const callBtn =
      product.productType === "dc"
        ? `<a href="tel:${product.dc.bookingPhone}"
             class="call-btn">
             📞 Call to Book
           </a>`
        : `<span class="store-note">
             Available in Store
           </span>`;

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
          Article Code: <strong>${product.articleCode}</strong>
        </div>

        <div class="price">
          ₹${product.price}
        </div>

        ${callBtn}
      </div>
    `;

    grid.appendChild(card);
  });
}

/* ===============================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
