import { createEmptyProduct, saveProduct } from "./admin-products.js";

let product = createEmptyProduct();

export function renderProductForm(container) {
  container.innerHTML = `
    <h2>Add Product</h2>

    <!-- 🔥 ARTICLE CODE -->
    <input placeholder="Article Code (Unique)" id="p-article" />

    <input placeholder="Product Name" id="p-name" />
    <input placeholder="Brand" id="p-brand" />
    <input placeholder="Category" id="p-category" />
    <input type="number" placeholder="Price" id="p-price" />

    <h4>Product Type</h4>
    <label>
      <input type="radio" name="ptype" value="store" checked />
      Store Product
    </label>
    <label>
      <input type="radio" name="ptype" value="dc" />
      DC Product
    </label>

    <div id="store-fields">
      <input type="number" placeholder="Store Stock" id="p-stock" />
    </div>

    <div id="dc-fields" style="display:none">
      <input placeholder="Booking Phone" id="p-phone" value="9705379219" />
    </div>

    <textarea placeholder="Description" id="p-desc"></textarea>

    <button id="saveProduct">SAVE PRODUCT</button>
  `;

  bindFormEvents(container);
}

function bindFormEvents(container) {
  container.querySelectorAll("input[name='ptype']").forEach(radio => {
    radio.onchange = e => {
      product.productType = e.target.value;
      toggleFields(container, product.productType);
    };
  });

  container.querySelector("#saveProduct").onclick = () => {
    product.articleCode =
      container.querySelector("#p-article").value.trim();

    if (!product.articleCode) {
      alert("❌ Article Code is required");
      return;
    }

    product.name = container.querySelector("#p-name").value;
    product.brand = container.querySelector("#p-brand").value;
    product.category = container.querySelector("#p-category").value;
    product.price = +container.querySelector("#p-price").value;
    product.description = container.querySelector("#p-desc").value;

    product.store.stock = +container.querySelector("#p-stock").value;
    product.dc.bookingPhone =
      container.querySelector("#p-phone").value || "9705379219";

    saveProduct(product);

    product = createEmptyProduct();
    alert("✅ Product Added");
  };
}

function toggleFields(container, type) {
  container.querySelector("#store-fields").style.display =
    type === "store" ? "block" : "none";

  container.querySelector("#dc-fields").style.display =
    type === "dc" ? "block" : "none";
}
