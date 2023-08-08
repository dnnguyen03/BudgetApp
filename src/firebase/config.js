import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBgX1Vevk7Fc0umjxghYR2ltbKzqcGzajw",
  authDomain: "budgetapp-80ca5.firebaseapp.com",
  projectId: "budgetapp-80ca5",
  storageBucket: "budgetapp-80ca5.appspot.com",
  messagingSenderId: "550686093760",
  appId: "1:550686093760:web:0cc372af6bb01efd771825",
  measurementId: "G-RV0JJY2MYL",
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()

export { db, auth }
