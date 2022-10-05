import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, Text, View } from 'react-native'
import { Colors, SharedStyles, Typography } from '../../style'
import CategoryPill from '../atoms/category-pill'
import PressableOpacity from '../atoms/PressableOpacity'

import { useDispatch, useSelector } from 'react-redux'
import { addToList, setLoading, storeListToAsync } from '../../store/shopping-list-slice'
import { IShoppingListItem } from '../../interfaces/endpoints'

import Lottie from 'lottie-react-native'
import { storeShoppingList } from '../../async-storage'

interface Props {
  itemId: string
  imgUrl: string;
  itemName: string;
  itemDescription: string;
  itemDiscountPercent: string;
  itemDiscountedPrice: number;
  itemFullPrice: number;
  itemDiscountedPriceEur: any;
  itemFullPriceEur: any;
  storeId: string,
  storeLogoUrl: string | undefined;
  startAt: string,
  endAt: string,
  style?: object,
  storeName: string
}

const ItemCard: React.FC<Props> = props => {
  const dispatch = useDispatch()

  const { shoppingList } = useSelector((state: any) => state.shoppingList)

  const [animPlaying, setAnimPlaying] = useState<boolean>(false)
  const [itemImgLoading, setItemImgLoading] = useState<boolean>(false)
  const [storeImgLoading, setStoreImgLoading] = useState<boolean>(false)
  const animationRef = useRef<Lottie>(null)

  const product : IShoppingListItem = {
    id: props.itemId,
    name: props.itemName,
    fullPrice: props.itemFullPrice,
    discountedPrice: props.itemDiscountedPrice,
    storeId: props.storeId,
    startAt: props.startAt,
    endAt: props.endAt
  }

  return (
    <View
      style={[
        SharedStyles.shadow.elevation5,
        {
          width: Dimensions.get('window').width * 0.4,
          aspectRatio: 1 / 2,
          backgroundColor: Colors.themeColor().cardBackground,
          margin: Typography.FONT_SIZE_TITLE_MD / 2,
          borderRadius: Typography.FONT_SIZE_TITLE_MD / 2,
          paddingTop: Typography.FONT_SIZE_TITLE_MD / 2
        }, props.style
      ]}>
      <View
        style={{
          width: '90%',
          aspectRatio: 4 / 3,
          alignSelf: 'center',
          borderRadius: Typography.FONT_SIZE_TITLE_MD / 4,
          backgroundColor: !itemImgLoading ? Colors.themeColor().background : Colors.themeColor().textSecondary,
          opacity: !itemImgLoading ? 1 : 0.2
        }}
      >
        <Image
          onLoadStart={() => setItemImgLoading(true)}
          onLoadEnd={() => setItemImgLoading(false)}
          style={{ flex: 1, resizeMode: 'contain', opacity: !itemImgLoading ? 1 : 0 }}
          source={{ uri: props.imgUrl }}
          loadingIndicatorSource={require('../../assets/img-placeholder.png')}
          />

      </View>

      <View
        style={{
          flex: 1,
          marginTop: Typography.FONT_SIZE_TITLE_MD,
          margin: Typography.FONT_SIZE_TITLE_MD / 2,
          overflow: 'hidden'

        }}>
        <Text style={{
          color: Colors.themeColor().textPrimary
        }}>{props.itemName}</Text>

        <Text
          style={{
            fontSize: Typography.FONT_SIZE_TITLE_LG / 2,
            color: Colors.themeColor().textSecondary
          }}>
          {props.itemDescription}
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: 'row'
          }}>
          <View
            style={{
              marginTop: Typography.FONT_SIZE_NORMAL,
              justifyContent: 'flex-end',
              flex: 1
            }}>
            <CategoryPill
              text={props.itemDiscountPercent + '%'}
              isDisabled={true}
              style={{
                paddingHorizontal: 5,
                backgroundColor: Colors.themeColor().primary,
                borderRadius: Typography.FONT_SIZE_TITLE_MD / 4
              }}
              textStyle={{
                fontSize: Typography.FONT_SIZE_TITLE_MD / 2,
                color: Colors.themeColor().background
              }}
            />

            <Text style={{
              marginTop: Typography.FONT_SIZE_NORMAL / 4,
              color: Colors.themeColor().textPrimary
            }}>
              {props.itemDiscountedPrice + ' kn'}
            </Text>
            <Text
              style={{
                marginTop: Typography.FONT_SIZE_NORMAL / 4,
                fontSize: Typography.FONT_SIZE_TITLE_MD / 2,
                textDecorationLine: 'line-through',
                color: Colors.themeColor().textSecondary
              }}>
              {props.itemFullPrice + ' kn'}
            </Text>
            <Text style={{
              marginTop: Typography.FONT_SIZE_NORMAL / 4,
              color: Colors.themeColor().textPrimary
            }}>
              {props.itemDiscountedPriceEur + '€'}
            </Text>
            <Text
              style={{
                marginTop: Typography.FONT_SIZE_NORMAL / 4,
                fontSize: Typography.FONT_SIZE_TITLE_MD / 2,
                textDecorationLine: 'line-through',
                color: Colors.themeColor().textSecondary
              }}>
              {props.itemFullPriceEur + '€'}
            </Text>
          </View>

          <View
            style={{
              flex: 0.3,
              paddingBottom: Typography.FONT_SIZE_TITLE_MD / 2,
              justifyContent: 'flex-end'
            }}>
            <PressableOpacity onPress={() => {
              setAnimPlaying(true)
              animationRef.current?.play(30, 180)
              dispatch(addToList(product))
              dispatch(setLoading(true))

              setTimeout(() => {
                animationRef.current?.reset()
                setAnimPlaying(false)
                dispatch(setLoading(false))
              }, 1300)
            }} style={{ }} isDisabled={animPlaying}>
              <Lottie
                style={{ width: Typography.FONT_SIZE_TITLE_MD * 1.5, height: Typography.FONT_SIZE_TITLE_MD * 1.5, justifyContent: 'center', alignItems: 'center' }}
                ref={animationRef}
                source={require('../../assets/lottie/item-card-added.json')}
                loop={false}
                speed={2}

              />
            </PressableOpacity>
          </View>

          <View
            style={{
              position: 'absolute',
              width: 60,
              height: 60,
              aspectRatio: 1 / 1,
              transform: [{ rotate: '30deg' }],
              right: 0,
              top: -20,
              opacity: 0.3
            }}
          >
            {
              props.storeLogoUrl !== undefined &&
              (
                <View style={{
                  flex: 1,
                  aspectRatio: 1 / 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Image onLoadStart={() => setStoreImgLoading(true)} onLoadEnd={() => setStoreImgLoading(false)} style={{
                    flex: 1,
                    aspectRatio: 1 / 1,
                    resizeMode: 'contain'
                  }} source={{ uri: props.storeLogoUrl }} />

                  {
                    storeImgLoading &&
                    <Text style={{ color: Colors.themeColor().textPrimary, position: 'absolute' }}>{props.storeName}</Text>
                  }
                </View>
              )
            }
          </View>
        </View>
      </View>
    </View>
  )
}

export default ItemCard
