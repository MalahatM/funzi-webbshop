// firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// my Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDbm7-i20R4IfKgpJi0WY0watQgDUvZlX4",
  authDomain: "funzi-shop.firebaseapp.com",
  projectId: "funzi-shop",
  storageBucket: "funzi-shop.appspot.com", 
  messagingSenderId: "335646651032",
  appId: "1:335646651032:web:a30ede9d968f0013b396ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
