import { endAt } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Alert, Button, FlatList, Image, KeyboardAvoidingView, ScrollView, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { calculatePercentage, shoppingListToRender } from '../../helpers'
import { IProduct, IShoppingListItem } from '../../interfaces/endpoints'
import { addToList, removeFromList } from '../../store/shopping-list-slice'
import { Colors, Typography } from '../../style'
import { FONT_SIZE_TITLE_LG } from '../../style/typography'
import CategoryPill from '../atoms/category-pill'
import PressableOpacity from '../atoms/PressableOpacity'

interface Props {
    itemId: string
    itemsList: any[]
    storeId: string,
    storeImg: string,
    storeName: string
}

const ShoppingListItem: React.FC<Props> = ({ itemId, itemsList, storeId, storeImg, storeName }) => {
  const { shoppingList } = useSelector((state: any) => state.shoppingList)
  const { stores } = useSelector((state: any) => state.stores)
  const dispatch = useDispatch()

  const [itemsFullPriceTotal, setItemsFullPriceTotal] = useState<number>(0)
  const [itemsDiscountedlPriceTotal, setITemsDiscountedPriceTotal] = useState<number>(0)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [customItemName, setCustomItemName] = useState<string>('')

  const customItemObject: IShoppingListItem = {
    id: Math.random().toFixed(20),
    storeId,
    name: customItemName,
    fullPrice: 0,
    discountedPrice: 0,
    startAt: new Date().getTime().toString().substring(0, 10),
    endAt: new Date().getTime().toString().substring(0, 10) + (3600 * 24)
  }

  useEffect(() => {
    const getShoppingListItemsTotal = () => {
      itemsList.forEach((item: IProduct) => {
        setItemsFullPriceTotal((prevTotal) => prevTotal + item.fullPrice)
        setITemsDiscountedPriceTotal((prevTotal) => prevTotal + item.discountedPrice)
      })
    }
    getShoppingListItemsTotal()
  }, [])

  console.log(customItemName)

  return (
    <View style={{ flex: 1, paddingHorizontal: Typography.FONT_SIZE_TITLE_MD, paddingTop: Typography.FONT_SIZE_TITLE_MD }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Typography.FONT_SIZE_TITLE_MD / 2, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ height: Typography.FONT_SIZE_TITLE_MD * 2.5, aspectRatio: 1 / 1, resizeMode: 'contain' }} source={{ uri: storeImg }} />
                <Text style={{
                  marginLeft: Typography.FONT_SIZE_TITLE_MD,
                  color: Colors.themeColor().textPrimary
                }}>{storeName}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <PressableOpacity
                    onPress={() => setIsEditing((prevState) => !prevState)}
                    style={{ marginRight: Typography.FONT_SIZE_NORMAL }}
                >
                    <Text style={{ color: isEditing ? Colors.themeColor().successText : Colors.themeColor().btnInfo, fontWeight: Typography.FONT_WEIGHT_BOLD }}>{isEditing ? 'završi' : 'uredi'}</Text>
                </PressableOpacity>

                <PressableOpacity
                    onPress={() => {
                      return Alert.alert(
                        'Ukloniti sve?',
                        'Jeste li sigurni da želite ukloniti cijelu listu?',
                        [
                          {
                            text: 'Odustani',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel'
                          },
                          {
                            text: 'Ukloni',
                            onPress: () => {
                              itemsList.forEach((item: any) => {
                                dispatch(removeFromList(item.id))
                              })
                            }
                          }
                        ]
                      )
                    }}>
                    <Text style={{ color: Colors.themeColor().btnError, fontWeight: Typography.FONT_WEIGHT_BOLD }}>ukloni sve</Text>
                </PressableOpacity>
            </View>
        </View>

        <FlatList
            style={{ flex: 1 }}
            data={itemsList}
            renderItem={({ item, index }) => {
              console.log(index)
              return <View key={index} style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'space-between',
                paddingHorizontal: Typography.FONT_SIZE_TITLE_MD / 2,
                marginBottom: 4
              }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline' }}>
                    <Text style={{
                      color: Colors.themeColor().textPrimary
                    }}>- {item.name}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'baseline' }}>
                      <Text style={{
                        textDecorationLine: 'line-through',
                        marginRight: Typography.FONT_SIZE_TITLE_MD / 2,
                        fontSize: FONT_SIZE_TITLE_LG / 2,
                        color: Colors.themeColor().textSecondary
                      }}>{item.fullPrice !== 0 ? `${item.fullPrice} kn` : null}</Text>
                      <Text style={{
                        marginRight: Typography.FONT_SIZE_TITLE_MD / 2,
                        color: Colors.themeColor().textPrimary
                      }}>{item.discountedPrice !== 0 ? `${item.discountedPrice} kn` : null}</Text>
                    </View>

                </View>

                {
                  isEditing && <PressableOpacity onPress={() => dispatch(removeFromList(item.id))}
                  style={{ marginLeft: -5, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
                  >
                    <Text style={{ color: Colors.themeColor().btnError, fontWeight: 'bold' }}>-</Text>
                  </PressableOpacity>
                }

              </View>
            }}
        />

          {
            isEditing &&
            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: Typography.FONT_SIZE_TITLE_MD / 2, alignItems: 'center' }}>
              <Text style={{
                color: Colors.themeColor().textSecondary
              }}>- </Text>

              <TextInput value={customItemName} onChangeText={(text) => setCustomItemName(text)}
                placeholderTextColor={Colors.themeColor().textSecondary}
                placeholder='Dodajte proizvoljni proizvod na popis'
                style={{
                  color: Colors.themeColor().textPrimary,
                  flex: 1
                }}
                onEndEditing={() => {
                  if (customItemName !== '') {
                    dispatch(addToList(customItemObject))
                    setCustomItemName('')
                  }
                }}
              />
            </View>

          }

        <View style={{ marginTop: Typography.FONT_SIZE_TITLE_MD, marginHorizontal: Typography.FONT_SIZE_TITLE_MD / 2, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'baseline' }}>
            <Text style={{
              marginRight: Typography.FONT_SIZE_TITLE_MD / 2,
              color: Colors.themeColor().textPrimary
            }}>Ukupno:</Text>

            <CategoryPill
              text={calculatePercentage(itemsDiscountedlPriceTotal, itemsFullPriceTotal) + '%'}
              isDisabled={true}
              style={{
                paddingHorizontal: Typography.FONT_SIZE_TITLE_MD / 4,
                backgroundColor: Colors.themeColor().successText,
                borderRadius: Typography.FONT_SIZE_TITLE_MD / 4
              }}
              textStyle={{
                fontSize: Typography.FONT_SIZE_TITLE_MD / 2,
                color: Colors.themeColor().background
              }}
            />
            <Text style={{
              textDecorationLine: 'line-through',
              color: Colors.themeColor().textSecondary,
              marginRight: Typography.FONT_SIZE_TITLE_MD / 2,
              fontSize: Typography.FONT_SIZE_TITLE_LG / 2
            }}>{itemsFullPriceTotal.toFixed(2)} kn</Text>
            <Text style={{
              color: Colors.themeColor().textPrimary
            }}>{itemsDiscountedlPriceTotal.toFixed(2)} kn</Text>
        </View>
    </View>
  )
}

export default ShoppingListItem
