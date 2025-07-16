// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_FIREBASE,
  authDomain: "jobportal-9c534.firebaseapp.com",
  projectId: "jobportal-9c534",
  storageBucket: "jobportal-9c534.appspot.com",
  messagingSenderId: "64294400902",
  appId: "1:64294400902:web:18653fc24bfde82584b207"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;