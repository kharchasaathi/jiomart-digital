/***************************************************
 * JIOMART DIGITAL – ADMIN SESSION (FIXED)
 * File: assets/js/admin/admin-session.js
 * * పరిష్కారం: లాగిన్ అయిన వెంటనే renderPage() మరియు 
 * text-editing ఫీచర్లను ఇది ట్రిగ్గర్ చేస్తుంది.
 ***************************************************/

import { onAuthChange } from "../core/firebase.js";
import { setAdminMode } from "../core/state.js";
import { renderPage } from "./render.js";
import { enableTextEditing } from "./text-edit.js";

const ADMIN_EMAIL = "abidalimohammad94@gmail.com";

console.log("🧩 admin-session.js: Initializing...");

/* ================================
   AUTH SESSION HANDLER
================================ */
onAuthChange((user) => {
  // 1. అడ్మిన్ అవునో కాదో ఈమెయిల్ ద్వారా చెక్ చేయడం
  const isAdmin = !!user && user.email === ADMIN_EMAIL;

  if (isAdmin) {
    console.log("✅ Admin session confirmed:", user.email);

    // 2. గ్లోబల్ స్టేట్ అప్‌డేట్ (adminMode = true)
    setAdminMode(true);

    // 3. UI మార్పులు (Buttons visibility)
    document.body.classList.add("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.add("hidden");
    document.getElementById("adminLogoutBtn")?.classList.remove("hidden");

    // 4. 🔥 అతి ముఖ్యమైనది: పేజీని అడ్మిన్ మోడ్‌లో మళ్ళీ రెండర్ చేయడం
    renderPage();

    // 5. టెక్స్ట్ ఎడిటింగ్ ఆప్షన్ ఎనేబుల్ చేయడం
    const root = document.getElementById("pageRoot");
    if (root) enableTextEditing(root);

  } else {
    console.log("👁 Public session active");

    // 2. గ్లోబల్ స్టేట్ అప్‌డేట్ (adminMode = false)
    setAdminMode(false);

    // 3. UI మార్పులు
    document.body.classList.remove("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.remove("hidden");
    document.getElementById("adminLogoutBtn")?.classList.add("hidden");

    // 4. పబ్లిక్ మోడ్ కోసం పేజీని రీ-రెండర్ చేయడం
    renderPage();
  }
});
