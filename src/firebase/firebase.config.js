import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU8V6LTiWsvhFENOYq9C4UZYFqwR-1klo",
  authDomain: "online-learning-platform-2b49a.firebaseapp.com",
  projectId: "online-learning-platform-2b49a",
  storageBucket: "online-learning-platform-2b49a.firebasestorage.app",
  messagingSenderId: "982352179601",
  appId: "1:982352179601:web:0e76c6472a4175be67aa30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)