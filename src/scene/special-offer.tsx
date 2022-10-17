import React, { useLayoutEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import PressableOpacity from '../components/atoms/PressableOpacity'
import ItemCard from '../components/molecules/item-card'
import { calculatePercentage } from '../helpers'
import { IProduct, IStores } from '../interfaces/endpoints'
import { Colors, Typography } from '../style'

interface Props {
  navigation: any
}

const SpecialOffer : React.FC<Props> = ({ navigation }) => {
  const { products } = useSelector((state: any) => state.products)
  const { stores } = useSelector((state: any) => state.stores)

  const dateNow = new Date().getTime().toString().substr(0, 10)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <PressableOpacity onPress={() => navigation.goBack()} style={{ }}>
          <Icon name="chevron-back" size={24} color={Colors.themeColor().background} />
        </PressableOpacity>
    })
  })

  const getStoreData = (storeId: string) => {
    const imgArray = stores.map((store: IStores) => {
      let storeData : object
      if (store.id === storeId) {
        storeData = {
          img: store.imgUrl,
          name: store.name
        }
        return storeData
      }

      return null
    })

    const img = imgArray.filter(Boolean)
    return img[0]
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.themeColor().background }}>
      <FlatList style={{ flex: 1, backgroundColor: Colors.themeColor().background }}
        numColumns={2}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center'
        }}
        ListHeaderComponent={<View style={{ flexDirection: 'row', paddingHorizontal: Typography.FONT_SIZE_TITLE_MD / 2, paddingTop: Typography.FONT_SIZE_TITLE_MD }}>
          <Text
            style={{
              marginLeft: Typography.FONT_SIZE_TITLE_MD / 2,
              fontWeight: Typography.FONT_WEIGHT_BOLD,
              color: Colors.themeColor().textPrimary,
              marginBottom: Typography.FONT_SIZE_TITLE_MD / 2
            }}>
            Posebna ponuda
          </Text>
        </View>
        }
        ListHeaderComponentStyle={{ flexDirection: 'row', width: '100%' }}
        data={products.filter((p: IProduct) => dateNow >= p.startAt && dateNow <= p.endAt && p.categoryId === '1')}
        renderItem={({ item, index }) => {
          // return <CategoryItems categoryId={item.categoryId} categoryTitle='Posebna ponuda' showButton={false} />
          return <ItemCard
              storeId={item.storeId}
              itemId={item.id}
              imgUrl={item.imgUrl}
              itemName={item.name}
              itemDescription={item.description}
              itemDiscountPercent={calculatePercentage(item.discountedPrice, item.fullPrice)}
              itemDiscountedPrice={item.discountedPrice}
              itemFullPrice={item.fullPrice}
              itemDiscountedPriceEur={(item.discountedPrice / 7.53450).toFixed(2)}
              itemFullPriceEur={(item.fullPrice / 7.53450).toFixed(2)}
              storeLogoUrl={getStoreData(item.storeId).img}
              storeName={getStoreData(item.storeId).name}
              startAt={item.startAt}
              endAt={item.endAt}
              style={{
                width: 150
              }}
            />
        }}

      />
    </View>
  )
}

export default SpecialOffer
