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
  if (!container) {
    console.warn("❌ #productDetail not found");
    return;
  }

  const state = getState();
  const products = state.products || [];
  const product = products.find(p => p.id === productId);

  if (!product) {
    container.innerHTML = "<p>Product not found</p>";
    return;
  }

  /* ===============================
     MAIN IMAGE
  ================================ */
  const mainImage =
    product.images?.length ? product.images[0] : null;

  /* ===============================
     IMAGE GALLERY (THUMBS)
  ================================ */
  const gallery =
    product.images?.length
      ? product.images
          .map(
            (img, index) =>
              `<img src="${img}" data-index="${index}" />`
          )
          .join("")
      : `<div class="no-image">No Image</div>`;

  /* ===============================
     VIDEO (OPTIONAL – FUTURE READY)
  ================================ */
  const videoSection =
    product.videos?.length
      ? `
        <div class="product-video" style="margin-top:16px;">
          <iframe
            width="100%"
            height="250"
            src="${product.videos[0]}"
            frameborder="0"
            allowfullscreen>
          </iframe>
        </div>
      `
      : "";

  /* ===============================
     HIGHLIGHTS (PHASE 3.5)
  ================================ */
  const highlights =
    product.highlights?.length
      ? `
        <ul class="product-highlights">
          ${product.highlights
            .map(h => `<li>${h}</li>`)
            .join("")}
        </ul>
      `
      : `<p class="muted">
           Highlights will be explained in store.
         </p>`;

  /* ===============================
     SPECIFICATIONS (PHASE 3.5)
  ================================ */
  const specs = product.specs || {};
  const specsTable = `
    <table class="specs-table">
      <tr><td>Brand</td><td>${specs.brand || "-"}</td></tr>
      <tr><td>Category</td><td>${specs.category || "-"}</td></tr>
      <tr><td>Warranty</td><td>${specs.warranty || "-"}</td></tr>
      <tr><td>Delivery</td><td>${specs.delivery || "Store / DC"}</td></tr>
      <tr><td>Installation</td><td>${specs.installation || "Available"}</td></tr>
    </table>
  `;

  /* ===============================
     ACTION BUTTON
  ================================ */
  const action =
    product.productType === "dc"
      ? `<a class="call-btn"
           href="tel:${product.dc?.bookingPhone || "9705379219"}">
           📞 Call to Book
         </a>`
      : `<div class="store-note">
           Available in Store
         </div>`;

  /* ===============================
     FINAL HTML
  ================================ */
  container.innerHTML = `
    <div class="product-detail-grid">

      <!-- LEFT: IMAGES -->
      <div>
        ${
          mainImage
            ? `<img
                id="mainProductImage"
                src="${mainImage}"
                style="
                  width:100%;
                  max-height:360px;
                  object-fit:contain;
                  border:1px solid #ddd;
                  border-radius:8px;
                  background:#fff;
                "
              />`
            : `<div class="no-image">No Image</div>`
        }

        <div class="product-gallery">
          ${gallery}
        </div>

        ${videoSection}
      </div>

      <!-- RIGHT: INFO -->
      <div class="product-detail-info">
        <h2>${product.name || "Unnamed Product"}</h2>

        <div class="article-code">
          Article Code:
          <strong>${product.articleCode || "-"}</strong>
        </div>

        <div class="price">
          ₹${product.price ?? "-"}
        </div>

        ${highlights}

        <h3>Specifications</h3>
        ${specsTable}

        <p>
          ${product.description || ""}
        </p>

        ${action}
      </div>

    </div>
  `;

  enableImageSwitch();
}

/* ===============================
   IMAGE SWITCH LOGIC
================================ */
function enableImageSwitch() {
  const mainImg = document.getElementById("mainProductImage");
  const thumbs = document.querySelectorAll(".product-gallery img");

  if (!mainImg || !thumbs.length) return;

  thumbs.forEach(img => {
    img.addEventListener("click", () => {
      mainImg.src = img.src;
    });
  });
}

/* ===============================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", renderProduct);
