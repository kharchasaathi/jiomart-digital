
/***************************************************
 * SITE UI – PUBLIC & ADMIN SHARED LAYOUT
 ***************************************************/

export function initSiteUI() {
  const root = document.getElementById("pageRoot");
  if (!root) return;

  root.innerHTML = `
    <header class="site-header">
      <div class="logo">JioMart Digital</div>
      <nav class="site-nav">
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">Offers</a>
        <a href="#">Contact</a>
      </nav>
    </header>

    <section class="hero">
      <h1 class="hero-title">Welcome to JioMart Digital</h1>
      <p class="hero-sub">
        Best deals. Trusted products. Local business power.
      </p>
      <button class="hero-btn">Shop Now</button>
    </section>

    <main id="cmsContent"></main>

    <footer class="site-footer">
      © ${new Date().getFullYear()} JioMart Digital
    </footer>
  `;
}
