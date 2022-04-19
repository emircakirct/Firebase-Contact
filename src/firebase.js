// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4_bf5SwMQazdiuTugh6PmkvrdLOZqQEU",
  authDomain: "fire-contact-a272a.firebaseapp.com",
  databaseURL: "https://fire-contact-a272a-default-rtdb.firebaseio.com/",
  projectId: "fire-contact-a272a",
  storageBucket: "fire-contact-a272a.appspot.com",
  messagingSenderId: "327998636277",
  appId: "1:327998636277:web:7563d1a657044974d945bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;