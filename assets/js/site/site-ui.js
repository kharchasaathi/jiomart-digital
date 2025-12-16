/***************************************************
 * PUBLIC SITE UI CONTROLS – PART 5B
 * Language toggle
 * Category filter
 * Image modal
 ***************************************************/

let currentLang = "en";
let currentCategory = "all";

/* Language toggle */
document.querySelectorAll(".lang-toggle button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang-toggle button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentLang = btn.dataset.lang;
    applyLanguage();
  });
});

/* Category filter */
document.querySelectorAll(".category-filter button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".category-filter button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.cat;
    filterProducts();
  });
});

/* Apply language */
function applyLanguage() {
  document.querySelectorAll(".en-text").forEach(el => {
    el.style.display = currentLang === "en" ? "block" : "none";
  });
  document.querySelectorAll(".te-text").forEach(el => {
    el.style.display = currentLang === "te" ? "block" : "none";
  });
}

/* Filter products */
function filterProducts() {
  document.querySelectorAll(".product-card").forEach(card => {
    const cat = card.dataset.category;
    card.style.display =
      currentCategory === "all" || cat === currentCategory
        ? "block"
        : "none";
  });
}

/* Image modal */
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("product-image")) {
    modalImg.src = e.target.src;
    modal.classList.remove("hidden");
  }
});

closeModal.onclick = () => modal.classList.add("hidden");
