// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATUShHT6pykOyq_-cHocZ_GyzzbLBxsfI",
  authDomain: "netflixgpt-5824a.firebaseapp.com",
  projectId: "netflixgpt-5824a",
  storageBucket: "netflixgpt-5824a.appspot.com",
  messagingSenderId: "998769080250",
  appId: "1:998769080250:web:8c8c224ba9d0662ecb0f83",
  measurementId: "G-W89SEBR63R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();