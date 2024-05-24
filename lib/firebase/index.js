// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // to link firestore database
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkVMHjnSG69ISkF4NSGfKFMRbmgeIkzLI",
  authDomain: "finance-tracker-1f0c4.firebaseapp.com",
  projectId: "finance-tracker-1f0c4",
  storageBucket: "finance-tracker-1f0c4.appspot.com",
  messagingSenderId: "283992416668",
  appId: "1:283992416668:web:8595a6c63e9ccde6966859",
  measurementId: "G-KX0NW9G0N7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {app,db}