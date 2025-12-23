import { getState } from "../core/state.js";

/* ===============================
   DOM ELEMENTS (SAFE)
================================ */
const grid = document.getElementById("productsGrid");
const searchInput = document.getElementById("productSearch");

/* ===============================
   RENDER PRODUCTS (PUBLIC)
================================ */
function renderProducts(list = []) {
  if (!grid) {
    console.warn("❌ #productsGrid not found");
    return;
  }

  grid.innerHTML = "";

  /* EMPTY STATE */
  if (!list.length) {
    grid.innerHTML = "<p>No products available</p>";
    return;
  }

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    const badge =
      product.productType === "dc"
        ? `<span class="badge dc">DC Product</span>`
        : `<span class="badge store">Store Product</span>`;

    const action =
      product.productType === "dc"
        ? `<a href="tel:${product.dc?.bookingPhone || "9705379219"}"
             class="call-btn"
             onclick="event.stopPropagation()">
             📞 Call to Book
           </a>`
        : `<div class="store-note">
             Available in Store
           </div>`;

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
          Article Code:
          <strong>${product.articleCode || "-"}</strong>
        </div>

        <div class="price">
          ₹${product.price ?? "-"}
        </div>

        ${action}
      </div>
    `;

    /* 🔥 OPEN PRODUCT DETAIL PAGE */
    card.addEventListener("click", () => {
      if (!product.id) {
        console.warn("❌ Product ID missing", product);
        return;
      }
      window.location.href = `product.html?id=${product.id}`;
    });

    grid.appendChild(card);
  });

  console.log("🛍 Products rendered:", list.length);
}

/* ===============================
   SEARCH LOGIC (PHASE 3.2)
================================ */
function handleSearch() {
  const state = getState();

  /* 🔥 APPLY VISIBILITY FILTER */
  const products = (state.products || [])
    .filter(p => p.visible !== false);

  if (!searchInput) return;

  const q = searchInput.value.trim().toLowerCase();

  if (!q) {
    renderProducts(products);
    return;
  }

  const filtered = products.filter(p => {
    return (
      p.name?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.articleCode?.toLowerCase().includes(q)
    );
  });

  renderProducts(filtered);
}

/* ===============================
   INIT (SAFE)
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const state = getState();

  /* 🔥 ONLY VISIBLE PRODUCTS */
  const products = (state.products || [])
    .filter(p => p.visible !== false);

  renderProducts(products);

  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }
});
