// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXYQaQufiZu84eVPc9QFoOZQ4Ev8tJYKE",
  authDomain: "pantry-tracker-ea3ba.firebaseapp.com",
  projectId: "pantry-tracker-ea3ba",
  storageBucket: "pantry-tracker-ea3ba.appspot.com",
  messagingSenderId: "605628879368",
  appId: "1:605628879368:web:69953a4a049cb197f837bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}