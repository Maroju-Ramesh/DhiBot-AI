
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
  import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js'
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC19K_hcdmdhKfXdQhNhZrsM_b8QSnRm78",
    authDomain: "dhibot-ai.firebaseapp.com",
    projectId: "dhibot-ai",
    storageBucket: "dhibot-ai.firebasestorage.app",
    messagingSenderId: "53745391628",
    appId: "1:53745391628:web:b024e5354f48edebf63629",
    measurementId: "G-HNC5WXRX8X"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

 const auth = getAuth(app) //initiazing firebase authentication
 
