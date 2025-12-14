function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, pass)
    .then(() => alert("Login Success"))
    .catch(err => alert(err.message));
}

function addProduct() {
  const name = document.getElementById("pname").value;
  const price = document.getElementById("pprice").value;
  const category = document.getElementById("pcategory").value;

  db.collection("products").add({
    name,
    price,
    category,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Product Added");
  });
}
