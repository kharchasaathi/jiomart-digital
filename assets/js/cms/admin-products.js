import { getState } from "../core/state.js";

export function createEmptyProduct() {
  return {
    id: crypto.randomUUID(),

    // 🔥 ARTICLE CODE (NEW)
    articleCode: "",

    name: "",
    brand: "",
    category: "",
    price: 0,
    productType: "store",

    store: {
      stock: 0
    },

    dc: {
      bookingPhone: "9705379219"
    },

    description: "",
    highlights: [],
    images: []
  };
}

export function saveProduct(product) {
  const state = getState();
  state.products ||= [];

  // 🔒 Prevent duplicate article codes
  const exists = state.products.some(
    p => p.articleCode === product.articleCode
  );

  if (exists) {
    alert("❌ Article Code already exists");
    return;
  }

  state.products.push(product);

  console.log("✅ Product saved:", product);
}
