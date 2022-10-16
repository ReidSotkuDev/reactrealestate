import { db } from '../components/firebase/firebase-config'
import { collection, doc, getDocs, query , getDoc , updateDoc } from 'firebase/firestore';
const getCollectiondata = async (url) => {
    let collectonData = query(collection(db, url))
    let docsData = await getDocs(collectonData)
    const data = docsData.docs.map((doc) => ({
      ...doc.data(), id: doc.id
    }))
    return data
  }
  const getDocsdata = async (url , docid) => {
    let docRef = doc(db, url , docid)
    let docsData = await getDoc(docRef)
    const data = docsData.data()
    return data
  }

  const updateDocumnet = async (url , docid , data) => {
    let docRef = doc(db, url , docid)
    let updateDocres = await updateDoc(docRef , data)
    const result = updateDocres
    return result
  }
  export {getCollectiondata , getDocsdata , updateDocumnet} 