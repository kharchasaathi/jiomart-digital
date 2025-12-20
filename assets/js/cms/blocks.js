
function createDefaultBlocks() {
  return [
    {
      id: "hero",
      type: "text",
      data: {
        html: `
<section class="hero">
  <h1>Welcome to JioMart Digital</h1>
  <p>Fresh groceries delivered to your doorstep.</p>
  <button>Shop Now</button>
</section>
        `
      }
    },
    {
      id: "features",
      type: "text",
      data: {
        html: `
<section class="features">
  <div class="feature">🚚 Fast Delivery</div>
  <div class="feature">💰 Best Prices</div>
  <div class="feature">✅ Trusted Quality</div>
</section>
        `
      }
    },
    {
      id: "content",
      type: "text",
      data: {
        html: `
<section class="content-section">
  <h2>మన షాప్ ఎందుకు ప్రత్యేకం?</h2>
  <p>
    మీరు ఇక్కడ తెలుగు లేదా ఇంగ్లీష్ లో మీ మెసేజ్ రాయచ్చు.
    ఇది పూర్తిగా editable.
  </p>
</section>
        `
      }
    },
    {
      id: "products",
      type: "text",
      data: {
        html: `
<section class="product-grid">
  <div class="product-card">
    <img src="https://via.placeholder.com/150">
    <p>Product Name</p>
  </div>
  <div class="product-card">
    <img src="https://via.placeholder.com/150">
    <p>Product Name</p>
  </div>
</section>
        `
      }
    },
    {
      id: "footer",
      type: "text",
      data: {
        html: `
<footer class="site-footer">
  © 2025 JioMart Digital. All rights reserved.
</footer>
        `
      }
    }
  ];
}
