import { firestore } from './firebase-init'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { ICatalog, ICategory, IProduct, IStores } from '../interfaces/endpoints'
import * as fs from '@react-native-firebase/firestore'

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

// Fetching category data
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

// Fetching catalog data
export const getAllCatalog = async () => {
  const catalogCol = collection(firestore, 'catalog')
  const catalogSnapshot = await getDocs(catalogCol)
  const lCatalogs = catalogSnapshot.docs.map(doc => {
    const catalog : ICatalog = {
      id: doc.id,
      storeId: doc.data().storeId,
      dateFrom: doc.data().dateFrom.seconds,
      dateTo: doc.data().dateTo.seconds
    }
    return catalog
  })

  return lCatalogs
}

// Fetching catalog data
export const getStoreCatalog = async (storeId: string) => {
  const catalogCol = collection(firestore, 'catalog')
  const q = query(catalogCol, where('storeId', '==', storeId))
  const catalogSnapshot = await getDocs(q)
  const lCatalogs = catalogSnapshot.docs.map(doc => {
    const catalog : ICatalog = {
      id: doc.id,
      storeId: doc.data().storeId,
      dateFrom: doc.data().dateFrom.seconds,
      dateTo: doc.data().dateTo.seconds
    }
    return catalog
  })
  return lCatalogs
}
