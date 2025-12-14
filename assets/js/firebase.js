// Firebase CDN (v9 compat)
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js"></script>

<script>
  const firebaseConfig = {
    apiKey: "AIzaSyByQBpGmHivJhXDqgB-JLpIHUYRr1ZGM7Q",
    authDomain: "jiomart-digital.firebaseapp.com",
    projectId: "jiomart-digital",
    storageBucket: "jiomart-digital.appspot.com",
    messagingSenderId: "703694544124",
    appId: "1:703694544124:web:3d51ddb7fe3182c51e4b79"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  console.log("🔥 Firebase connected");
</script>
