import React from 'react'
import { Image, Text, View } from 'react-native'
import { Colors, SharedStyles, Typography } from '../../style'
import CategoryPill from '../atoms/category-pill'
import PressableOpacity from '../atoms/PressableOpacity'

import Icon from 'react-native-vector-icons/MaterialIcons'

interface Props {
  imgUrl: string;
  itemName: string;
  itemDescription: string;
  itemDiscountPercent: string;
  itemDiscountedPrice: string;
  itemFullPrice: string;
  itemDiscountedPriceEur: string;
  itemFullPriceEur: string;
  storeLogoUrl: string | undefined;
}

const ItemCard: React.FC<Props> = props => {
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
          backgroundColor: Colors.themeColor().backgroundDark,
          alignSelf: 'center',
          borderRadius: Typography.FONT_SIZE_TITLE_MD / 4
        }}
      />

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
              text="-20%"
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
              {props.itemDiscountedPrice}
            </Text>
            <Text
              style={{
                marginTop: Typography.FONT_SIZE_NORMAL / 4,
                fontSize: Typography.FONT_SIZE_TITLE_MD / 2,
                textDecorationLine: 'line-through',
                color: Colors.themeColor().textSecondary
              }}>
              {props.itemFullPrice}
            </Text>
            <Text style={{ marginTop: Typography.FONT_SIZE_NORMAL / 4 }}>
              {props.itemDiscountedPriceEur}
            </Text>
            <Text
              style={{
                marginTop: Typography.FONT_SIZE_NORMAL / 4,
                fontSize: Typography.FONT_SIZE_TITLE_MD / 2,
                textDecorationLine: 'line-through',
                color: Colors.themeColor().textSecondary
              }}>
              {props.itemDiscountedPriceEur}
            </Text>
          </View>

          <View
            style={{
              flex: 0.3,
              paddingBottom: Typography.FONT_SIZE_TITLE_MD / 2,
              justifyContent: 'flex-end'
            }}>
            <PressableOpacity onPress={() => {}} style={{}} isDisabled={false}>
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
