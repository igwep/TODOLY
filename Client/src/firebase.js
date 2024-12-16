// src/firebase.js
import { initializeApp, setLogLevel } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, FacebookAuthProvider, setPersistence, browserLocalPersistence  } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//setLogLevel("debug");

// Initialize Firestore and Authentication
const db = getFirestore(app);
const auth = getAuth(app);

 setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });
  auth.onAuthStateChanged(user => {
    if (user) {
        console.log("User is signed in:", user.email);
    } else {
        console.log("No user is signed in.");
    }
});

export { db, auth, createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, FacebookAuthProvider};
