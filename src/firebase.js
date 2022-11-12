// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1pjL9JYesgX4wsitVVAjvvDhX7lJ3_zI",
  authDomain: "fir-learning-d9284.firebaseapp.com",
  projectId: "fir-learning-d9284",
  storageBucket: "fir-learning-d9284.appspot.com",
  messagingSenderId: "642654359611",
  appId: "1:642654359611:web:3a4bc00116978d592b4c1e",
  measurementId: "G-MRHQDX234R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { auth, storage, db };

