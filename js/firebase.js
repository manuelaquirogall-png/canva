import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDt8hgx193wcZ6q75QqG3I3nFFqnqgRv4Y",
  authDomain: "canva-peromejor.firebaseapp.com",
  projectId: "canva-peromejor",
  storageBucket: "canva-peromejor.firebasestorage.app",
  messagingSenderId: "488746158648",
  appId: "1:488746158648:web:67e567ea07e00b510a74cd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

