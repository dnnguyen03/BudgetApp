import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "./config"

const useFirestore = (collectionName) => {
  const [documents, setDocuments] = useState([])
  useEffect(() => {
    let collectionRef = collection(db, collectionName)

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setDocuments(documents)
    })

    return unsubscribe
  }, [collectionName])

  return documents
}

export default useFirestore
