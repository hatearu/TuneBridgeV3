// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBsSJ0QTt9ECLdESQUitCIO1zM2UB-yhQ",
  authDomain: "tunebridge-c77d1.firebaseapp.com",
  projectId: "tunebridge-c77d1",
  storageBucket: "tunebridge-c77d1.appspot.com",
  messagingSenderId: "781456430419",
  appId: "1:781456430419:web:0cc6cedb46192c9650fda6",
  measurementId: "G-LS4MWQ5H0S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
