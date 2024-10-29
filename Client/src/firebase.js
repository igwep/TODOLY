// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDu9YGp-OxeUgzR4dU2k6Y53msOPNj4bkY",
    authDomain: "todolist-8e390.firebaseapp.com",
    databaseURL: "https://todolist-8e390-default-rtdb.firebaseio.com",
    projectId: "todolist-8e390",
    storageBucket: "todolist-8e390.appspot.com",
    messagingSenderId: "1067625301460",
    appId: "1:1067625301460:web:672e39c224968563e70241",
    measurementId: "G-68S43P0LPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Authentication
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, createUserWithEmailAndPassword, sendEmailVerification};
