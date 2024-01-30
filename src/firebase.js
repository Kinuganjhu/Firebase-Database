// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApMMUcBTslc9D94Rdwc0twGJMdSbe1Jpo",
  authDomain: "mineral-subject-399808.firebaseapp.com",
  databaseURL: "https://mineral-subject-399808-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mineral-subject-399808",
  storageBucket: "mineral-subject-399808.appspot.com",
  messagingSenderId: "580411434464",
  appId: "1:580411434464:web:ce63d33e7f687d6236f785"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);