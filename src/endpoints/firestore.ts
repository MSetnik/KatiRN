import { firestore } from './firebase-init'
import { collection, getDocs } from 'firebase/firestore'
import { ICategory, IProduct, IStores } from '../interfaces/endpoints'

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

// Fetching products data
export const getAllProducts = async () => {
  const productsCol = collection(firestore, 'product')
  const productsSnapshot = await getDocs(productsCol)
  const lProducts = productsSnapshot.docs.map(doc => {
    console.log(doc.data().startAt)
    const product : IProduct = {
      id: doc.id,
      name: doc.data().name,
      categoryId: doc.data().categoryId,
      storeId: doc.data().storeId,
      description: doc.data().description,
      fullPrice: doc.data().fullPrice,
      discountedPrice: doc.data().discountedPrice,
      imgUrl: doc.data().imgUrl,
      startAt: doc.data().startAt.seconds,
      endAt: doc.data().endAt.seconds
    }
    return product
  })
  return lProducts
}
