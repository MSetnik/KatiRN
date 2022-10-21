import AsyncStorage from '@react-native-async-storage/async-storage'
import { IShoppingListItem, IStores } from '../interfaces/endpoints'

const SHOPPING_LIST_PRODUCTS = '@shopping_list_products1'
const STORES_ASYNC = '@stores_async'
const FIRST_VISIT = '@first_visit2'

export const storeShoppingList = async (shoppingList: IShoppingListItem[]) => {
  try {
    const jsonValue = JSON.stringify(shoppingList)
    await AsyncStorage.setItem(SHOPPING_LIST_PRODUCTS, jsonValue)
  } catch (e) {
    // saving error
    console.log(e)
  }
}

export const getShoppingList = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(SHOPPING_LIST_PRODUCTS)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // error reading value
    console.log(e)
  }
}

export const saveStores = async (stores: IStores[]) => {
  try {
    const storesData = await getStores()

    if (JSON.stringify(storesData) !== JSON.stringify(stores)) {
      const jsonValue = JSON.stringify(stores)
      await AsyncStorage.setItem(STORES_ASYNC, jsonValue)
    }
  } catch (e) {
    // saving error
    console.log(e)
  }
}

export const getStores = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORES_ASYNC)

    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // error reading value
    console.log(e)
  }
}

export const saveIsFirstVisit = async () => {
  try {
    const jsonValue = JSON.stringify(true)
    await AsyncStorage.setItem(FIRST_VISIT, jsonValue)
  } catch (e) {
    // saving error
    console.log(e)
  }
}

export const getIsFirstVisit = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FIRST_VISIT)

    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // error reading value
    console.log(e)
  }
}
