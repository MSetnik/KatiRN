import AsyncStorage from '@react-native-async-storage/async-storage'
import { IShoppingListItem } from '../interfaces/endpoints'

const SHOPPING_LIST_PRODUCTS = '@shopping_list_products'

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
