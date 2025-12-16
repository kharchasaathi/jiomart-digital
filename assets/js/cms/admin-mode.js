const toolbar = document.getElementById("editorToolbar");

onAuthStateChanged(auth, (user) => {
  if (user) {
    toolbar.classList.remove("hidden");
  } else {
    toolbar.classList.add("hidden");
  }
});
