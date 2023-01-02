// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVt2CnxhumPsTTKWMNuMmqpjMHrSElo5s",
  authDomain: "teamkppp-cd4f9.firebaseapp.com",
  projectId: "teamkppp-cd4f9",
  storageBucket: "teamkppp-cd4f9.appspot.com",
  messagingSenderId: "819797775121",
  appId: "1:819797775121:web:801a9123b6c35bced332b0",
  measurementId: "G-MVQ362SNEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}
// const analytics = getAnalytics(app);