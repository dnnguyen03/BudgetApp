import { addDoc, collection, doc, getDoc } from "firebase/firestore"
import { db } from "./config"

export const addDocument = (collectionName, data) => {
  const dbRef = collection(db, collectionName)
  addDoc(dbRef, data)
}

export const getInitData = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const data = docSnap.data()
    const listWork = data.listWork
    console.log(listWork)
  } else {
    console.log("No such document!")
  }
}
