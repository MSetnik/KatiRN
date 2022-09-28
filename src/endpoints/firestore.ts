import { firestore } from './firebase-init'
import { collection, getDocs } from 'firebase/firestore'
import { ICategory, IStores } from '../interfaces/endpoints'

// Fetching store data
export const getStoreData = async () => {
  const storeCol = collection(firestore, 'store')
  const storeSnapshot = await getDocs(storeCol)
  const lStores = storeSnapshot.docs.map(doc => {
    const store : IStores = {
      id: doc.id,
      name: doc.data().name,
      imgUrl: doc.data().imgUrl
    }
    return store
  })
  return lStores
}

// Fetching store data
export const getCategories = async () => {
  const storeCol = collection(firestore, 'category')
  const categorySnapshot = await getDocs(storeCol)
  const lCategories = categorySnapshot.docs.map(doc => {
    const category : ICategory = {
      id: doc.id,
      name: doc.data().name
    }
    return category
  })
  return lCategories
}
