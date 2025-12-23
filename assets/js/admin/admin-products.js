import { getState } from "../core/state.js";

const form = document.getElementById("productForm");

form.addEventListener("submit", e => {
  e.preventDefault();

  const product = {
    id: crypto.randomUUID(),
    articleCode: articleCode.value.trim(),
    name: name.value.trim(),
    brand: brand.value.trim(),
    category: category.value.trim(),
    price: Number(price.value),
    productType: productType.value,
    description: description.value,
    images: [],
    videos: [],
    highlights: [],
    specs: {},
    dc: {
      bookingPhone: "9705379219"
    },
    createdAt: Date.now()
  };

  const state = getState();
  state.products ||= [];

  // ❌ Duplicate article code block
  if (state.products.some(p => p.articleCode === product.articleCode)) {
    alert("Article code already exists!");
    return;
  }

  state.products.push(product);

  alert("✅ Product added successfully");
  form.reset();

  console.log("PRODUCTS:", state.products);
});
