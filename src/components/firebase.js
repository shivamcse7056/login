// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_tAvIf49WgRk6wrVkSH9KuQivVPGgFyc",
  authDomain: "login-auth-e5fa7.firebaseapp.com",
  projectId: "login-auth-e5fa7",
  storageBucket: "login-auth-e5fa7.firebasestorage.app",
  messagingSenderId: "269523407971",
  appId: "1:269523407971:web:c65829e51d9f04fd225456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
