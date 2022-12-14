/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { getStores } from '../async-storage'
import PressableOpacity from '../components/atoms/PressableOpacity'
import ShoppingListItem from '../components/organisms/shopping-list-item'
import { shoppingListToRender } from '../helpers'
import { Colors, Typography } from '../style'

interface Props {
    navigation: any
}

const ShoppingList: React.FC<Props> = ({ navigation }) => {
  const { shoppingList } = useSelector((state: any) => state.shoppingList)
  const { stores } = useSelector((state: any) => state.stores)

  const dispatch = useDispatch()

  const [dataToRender, setDataToRender] = useState<any[]>([])

  useLayoutEffect(() => {
    if (Platform.OS !== 'ios') {
      navigation.setOptions({
        headerLeft: () => <PressableOpacity onPress={() => navigation.goBack()} style={{ }}>
          <Icon name="chevron-back" size={24} color={Colors.themeColor().background} />
        </PressableOpacity>
      })
    }
  })

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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 80}>

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
                    Pritiskom na "uredi" na listu mo??ete dodati proizvoljne bilje??ke kako bi si olak??ali kupovinu
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
