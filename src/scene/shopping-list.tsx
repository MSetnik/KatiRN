/* eslint-disable react/no-unescaped-entities */
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getStores } from '../async-storage'
import ShoppingListItem from '../components/organisms/shopping-list-item'
import { shoppingListToRender } from '../helpers'
import { IProduct, IShoppingListItem } from '../interfaces/endpoints'
import { removeFromList, storeListToAsync } from '../store/shopping-list-slice'
import { Colors, Typography } from '../style'

interface Props {
    navigation: any
}

const ShoppingList: React.FC<Props> = ({ navigation }) => {
  const { shoppingList } = useSelector((state: any) => state.shoppingList)
  const { stores } = useSelector((state: any) => state.stores)

  const dispatch = useDispatch()

  const [dataToRender, setDataToRender] = useState<any[]>([])

  useEffect(() => {
    const getStoresFromAsync = async () => {
      setDataToRender(shoppingListToRender(shoppingList, await getStores()))
    }

    getStoresFromAsync()
  }, [shoppingList])

  if (dataToRender.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.themeColor().background }}>
        <Text style={{
          color: Colors.themeColor().textPrimary
        }}>Shopping lista je prazna.</Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.themeColor().background }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 140}>

      <FlatList
          style={{
            flex: 1,
            height: '100%',
            backgroundColor: Colors.themeColor().background
          }}
          contentContainerStyle={{
            paddingBottom: Typography.FONT_SIZE_TITLE_MD * 2
          }}
          data={dataToRender}

          renderItem={({ item, index }) => {
            if (index === dataToRender.length - 1) {
              return <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
              <ShoppingListItem
                key={index}
                itemId={item.id}
                itemsList={item.items}
                storeId={item.storeId}
                storeImg={item.storeImg}
                storeName={item.storeName}
                />

                 <View style={{
                   marginHorizontal: Typography.FONT_SIZE_TITLE_MD * 2,
                   marginBottom: Typography.FONT_SIZE_TITLE_MD * 2.5,
                   marginTop: Typography.FONT_SIZE_TITLE_MD * 2
                 }}>
                  <Text style={{ fontSize: Typography.FONT_SIZE_TITLE_LG / 2, color: Colors.themeColor().textSecondary, marginBottom: Typography.FONT_SIZE_NORMAL / 4 }}>
                    info:
                  </Text>
                  <Text style={{ fontSize: Typography.FONT_SIZE_TITLE_LG / 2, color: Colors.themeColor().textSecondary }}>
                    Pritiskom na "uredi" na listu možete dodati proizvoljne bilješke kako bi si olakšali kupovinu
                  </Text>
                </View>
              </Pressable>
            }
            return <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
              <ShoppingListItem
              key={index}
              itemId={item.id}
              itemsList={item.items}
              storeId={item.storeId}
              storeImg={item.storeImg}
              storeName={item.storeName}
              />
            </Pressable>
          }}
      />
   </KeyboardAvoidingView>

  )
}

export default ShoppingList
