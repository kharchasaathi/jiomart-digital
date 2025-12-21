import { getState } from "../core/state.js";

/* ===============================
   RENDER PRODUCTS (PUBLIC)
================================ */
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) {
    console.warn("❌ #productsGrid not found");
    return;
  }

  const state = getState();
  const products = state.products || [];

  grid.innerHTML = "";

  /* EMPTY STATE */
  if (!products.length) {
    grid.innerHTML = `<p>No products available</p>`;
    return;
  }

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    const badge =
      p.productType === "dc"
        ? `<span class="badge dc">DC Product</span>`
        : `<span class="badge store">Store Product</span>`;

    const action =
      p.productType === "dc"
        ? `<a class="call-btn" href="tel:${p.dc.bookingPhone}">
             📞 Call to Book
           </a>`
        : `<div class="store-note">
             Available in Store
           </div>`;

    card.innerHTML = `
      <div class="product-image">
        ${
          p.images?.length
            ? `<img src="${p.images[0]}" alt="${p.name}">`
            : `<div class="no-image">No Image</div>`
        }
      </div>

      <div class="product-info">
        ${badge}

        <h3>${p.name}</h3>

        <div class="article-code">
          Article Code:
          <strong>${p.articleCode || "-"}</strong>
        </div>

        <div class="price">
          ₹${p.price}
        </div>

        ${action}
      </div>
    `;

    grid.appendChild(card);
  });

  console.log("🛍 Products rendered:", products.length);
}

/* ===============================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
