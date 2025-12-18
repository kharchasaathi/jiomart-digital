onAuthChange((user) => {
  const isAdmin = !!user && user.email === ADMIN_EMAIL;

  if (isAdmin) {
    localStorage.setItem("ADMIN_MODE", "true");
    setAdminMode(true);

    document.body.classList.add("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.add("hidden");
    document.getElementById("adminLogoutBtn")?.classList.remove("hidden");
  } else {
    localStorage.removeItem("ADMIN_MODE");
    setAdminMode(false);

    document.body.classList.remove("admin-mode");
    document.getElementById("adminLoginBtn")?.classList.remove("hidden");
    document.getElementById("adminLogoutBtn")?.classList.add("hidden");
  }
});
