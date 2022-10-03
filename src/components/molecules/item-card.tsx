import React, { useEffect, useRef, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { Colors, SharedStyles, Typography } from '../../style'
import CategoryPill from '../atoms/category-pill'
import PressableOpacity from '../atoms/PressableOpacity'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { addToList, setLoading } from '../../store/shopping-list-slice'
import { IProduct, IShoppingListItem } from '../../interfaces/endpoints'

import Lottie from 'lottie-react-native'

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
  endAt: string
}

const ItemCard: React.FC<Props> = props => {
  const dispatch = useDispatch()

  const [animPlaying, setAnimPlaying] = useState<boolean>(false)
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
          width: 150,
          aspectRatio: 1 / 2,
          backgroundColor: Colors.themeColor().cardBackground,
          margin: Typography.FONT_SIZE_TITLE_MD / 2,
          borderRadius: Typography.FONT_SIZE_TITLE_MD / 2,
          paddingTop: Typography.FONT_SIZE_TITLE_MD / 2
        }
      ]}>
      <View
        style={{
          width: '90%',
          aspectRatio: 4 / 3,
          alignSelf: 'center',
          borderRadius: Typography.FONT_SIZE_TITLE_MD / 4
        }}
      >
        <Image style={{ flex: 1, resizeMode: 'contain' }} source={{ uri: props.imgUrl }} />
      </View>

      <View
        style={{
          flex: 1,
          marginTop: Typography.FONT_SIZE_TITLE_MD,
          margin: Typography.FONT_SIZE_TITLE_MD / 2,
          overflow: 'hidden'
        }}>
        <Text>{props.itemName}</Text>

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

            <Text style={{ marginTop: Typography.FONT_SIZE_NORMAL / 4 }}>
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
            <Text style={{ marginTop: Typography.FONT_SIZE_NORMAL / 4 }}>
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
              }, 2500)
            }} style={{ }} isDisabled={animPlaying}>
              <Lottie
                style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                ref={animationRef}
                source={require('../../assets/lottie/item-card-added.json')}
                loop={false}
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
                <Image style={{ flex: 1, aspectRatio: 1 / 1, resizeMode: 'contain' }} source={{ uri: props.storeLogoUrl }} />
              )
            }
          </View>
        </View>
      </View>
    </View>
  )
}

export default ItemCard
