
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js'
import {getFirestore, setDoc, doc, getDoc} from 'https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js'


const firebaseConfig = {
  apiKey: "AIzaSyC19K_hcdmdhKfXdQhNhZrsM_b8QSnRm78",   //please use your API key here guys
  authDomain: "dhibot-ai.firebaseapp.com",
  projectId: "dhibot-ai",
  storageBucket: "dhibot-ai.firebasestorage.app",
  messagingSenderId: "53745391628",
  appId: "1:53745391628:web:b024e5354f48edebf63629",
  measurementId: "G-HNC5WXRX8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); 
export{auth, db, createUserWithEmailAndPassword,signInWithEmailAndPassword, getFirestore, setDoc, doc, getDoc}