import React from 'react'
import { Image, Text, View } from 'react-native'
import { Colors, SharedStyles, Typography } from '../../style'
import CategoryPill from '../atoms/category-pill'
import PressableOpacity from '../atoms/PressableOpacity'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { addToList } from '../../store/shopping-list-slice'
import { IProduct, IShoppingListItem } from '../../interfaces/endpoints'

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
}

const ItemCard: React.FC<Props> = props => {
  const dispatch = useDispatch()

  const product : IShoppingListItem = {
    id: props.itemId,
    name: props.itemName,
    fullPrice: props.itemFullPrice,
    discountedPrice: props.itemDiscountedPrice,
    storeId: props.storeId
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
          // backgroundColor: Colors.themeColor().backgroundDark,
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
              dispatch(addToList(product))
            }} style={{}} isDisabled={false}>
              <Icon
                name="add-shopping-cart"
                size={Typography.FONT_SIZE_TITLE_MD}
                color={Colors.themeColor().primary}
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
