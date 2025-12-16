import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const grid = document.getElementById("productsGrid");

async function loadProducts() {
  grid.innerHTML = "";

  const snap = await getDocs(collection(db, "products"));

  snap.forEach((docSnap) => {
    const p = docSnap.data();

    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = p.images?.[0];
    img.loading = "lazy";

    img.onclick = () => openModal(p.images);

    card.innerHTML = `
      <h3 class="en-text">${p.name_en}</h3>
      <h3 class="te-text hidden">${p.name_te}</h3>
      <p class="price">₹${p.price}</p>
      <a class="enquire" target="_blank"
        href="https://wa.me/919705379219?text=Interested in ${p.name_en}">
        Enquire
      </a>
    `;

    card.prepend(img);
    grid.appendChild(card);
  });
}

loadProducts();

/* IMAGE MODAL */
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");

function openModal(images) {
  modal.classList.remove("hidden");
  modalImg.src = images[0];
}

closeModal.onclick = () => modal.classList.add("hidden");
