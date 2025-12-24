document.addEventListener("DOMContentLoaded", () => {
  const isAdmin =
    localStorage.getItem("ADMIN_MODE") === "true";

  if (!isAdmin) {
    alert("Unauthorized access");
    window.location.href = "admin-login.html";
  }
});
