/* eslint-disable array-callback-return */
import React, { useCallback, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { calculatePercentage } from '../../helpers'
import { ICategory, IProduct, IStores } from '../../interfaces/endpoints'
import { Colors, SharedStyles, Typography } from '../../style'
import PressableOpacity from '../atoms/PressableOpacity'
import ItemCard from '../molecules/item-card'

interface Props {
    categoryId: string,
    categoryTitle: string,
    showButton: boolean,
    isHorizontal?: boolean,
    onPress?: (params: any) => any | undefined,
    setSelectedCategory?: any,
    storeId?: string,
    isFirst?: boolean
}

const CategoryItems : React.FC<Props> = (props) => {
  const { stores } = useSelector((state: any) => state.stores)
  const { products } = useSelector((state: any) => state.products)
  const { categories } = useSelector((state: any) => state.categories)

  const dateNow = new Date().getTime().toString().substring(0, 10)

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

  useEffect(() => {
    if (products.length !== 0) {
      getStoreData(products[0].storeId)
    }
  }, [products])

  const checkIfCategoryHasItems = (index: number) => {
    const categoriesWithProductsHelper: ICategory[] = []
    let currentCategoryIndex = 1
    categories.map((c: ICategory, i: number) => {
      if (index === i) {
        currentCategoryIndex = i
      }
      let hasCategoryItems: boolean = false
      products.map((p: IProduct) => {
        if (p.categoryId === c.id && !hasCategoryItems && p.categoryId !== '1') {
          categoriesWithProductsHelper.push(c)
          hasCategoryItems = true
        }
      })
    })

    return { categoriesWithProductsHelper, currentCategoryIndex }
  }

  const viewabilityConfig = {
    // minimumViewTime: 500,
    viewAreaCoveragePercentThreshold: 100
    // itemVisiblePercentThreshold: 50
  }

  const onViewableItemsChanged = useCallback<any>(({ viewableItems } : any) => {
  // do something with viewableItems here. It’s a list of items in the viewport.
    if (viewableItems.length !== 0 && props.setSelectedCategory !== undefined) {
      // if(viewableItems[viewableItems.length - 1].item.categoryId)
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].id === viewableItems[viewableItems.length - 1].item.categoryId) {
          // console.log(viewableItems)
          // console.log(checkIfCategoryHasItems().length - 1 + 'from items')
          props.setSelectedCategory(checkIfCategoryHasItems(i).currentCategoryIndex - 2)
          // console.log(checkIfCategoryHasItems(i).currentCategoryIndex)
        }
      }

      // console.log(viewableItems)
    }
  }, [])

  // console.log(products.filter((p: IProduct) => p.categoryId === props.categoryId && dateNow <= p.startAt && dateNow >= p.endAt).length)
  return (
    <View style={{
      marginBottom: Typography.FONT_SIZE_TITLE_MD
    }}>
      {
        !props.isFirst &&
          <View style={{
            // width: '100%',
            flex: 1,
            height: 1,
            backgroundColor: Colors.themeColor().borderColor,
            marginHorizontal: Typography.FONT_SIZE_TITLE_MD,
            marginBottom: Typography.FONT_SIZE_TITLE_MD
          }}/>
      }

        <Text
          style={{
            marginLeft: Typography.FONT_SIZE_TITLE_MD,
            // marginTop: Typography.FONT_SIZE_TITLE_MD / 2,
            fontWeight: Typography.FONT_WEIGHT_BOLD,
            color: Colors.themeColor().textPrimary,
            marginBottom: Typography.FONT_SIZE_TITLE_MD / 2
          }}>
          {props.categoryTitle}
        </Text>

        {
          props.isHorizontal
            ? <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={products.filter((p: IProduct) => p.categoryId === '1')}
            contentContainerStyle={{
              paddingLeft: 20
            }}
            style={{
              paddingBottom: Typography.FONT_SIZE_NORMAL / 2
            }}
            renderItem={({ item, index }) : any => {
              if (dateNow >= item.startAt && dateNow <= item.endAt && index < 6) {
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
              } else if (index === 6) {
                return (
                  <>

                    <ItemCard
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
                      startAt={item.startAt}
                      endAt={item.endAt}
                      storeName={getStoreData(item.storeId).name}
                      style={{
                        width: 150
                      }}
                    />

                    <PressableOpacity style={[
                      SharedStyles.shadow.elevation5,
                      {
                        width: 150,
                        aspectRatio: 1 / 2,
                        backgroundColor: Colors.themeColor().primaryLight,
                        margin: Typography.FONT_SIZE_TITLE_MD / 2,
                        borderRadius: Typography.FONT_SIZE_TITLE_MD / 2,
                        // paddingTop: Typography.FONT_SIZE_TITLE_MD / 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 20
                      }
                    ]}
                    onPress={props.onPress}
                    >
                        <Text style={{ color: Colors.themeColor().textPrimary, textAlign: 'center' }}>
                          Prikaži sve proizvode
                        </Text>
                    </PressableOpacity>

                  </>
                )
              }
            }}
            />
            : <FlatList
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={props.storeId === undefined ? products.filter((p: IProduct) => p.categoryId === props.categoryId) : products.filter((p: IProduct) => p.categoryId === props.categoryId && p.storeId === props.storeId)}
                contentContainerStyle={{
                  marginLeft: '5%'
                }}
                style={{
                  alignSelf: 'auto',
                  alignItems: products.filter((p: IProduct) => p.categoryId === props.categoryId && dateNow >= p.startAt && dateNow <= p.endAt).length === 1 ? 'baseline' : 'center',
                  marginLeft: products.filter((p: IProduct) => p.categoryId === props.categoryId && dateNow >= p.startAt && dateNow <= p.endAt).length === 1 ? '5%' : 0
                }}
                onViewableItemsChanged={ onViewableItemsChanged }
                viewabilityConfig={ viewabilityConfig }
                renderItem={({ item }) => {
                  if (item.categoryId === props.categoryId && dateNow >= item.startAt && dateNow <= item.endAt) {
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
                      startAt={item.startAt}
                      endAt={item.endAt}
                      storeName={getStoreData(item.storeId).name}

                    />
                  } else {
                    return null
                  }
                }}
              />
        }

        {
          props.showButton &&
          <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: Typography.FONT_SIZE_TITLE_MD,
                justifyContent: 'center',
                marginBottom: Typography.FONT_SIZE_TITLE_MD / 2

              }}>
              <PressableOpacity
              onPress={props.onPress ? props.onPress : () => {}}
              style={{
                backgroundColor: Colors.themeColor().primary,
                flex: 1,
                alignItems: 'center',
                borderRadius: Typography.FONT_SIZE_TITLE_MD / 2,
                paddingVertical: Typography.FONT_SIZE_TITLE_MD / 2
              }}>
                  <Text
                      style={{
                        color: Colors.themeColor().background,
                        fontWeight: Typography.FONT_WEIGHT_MEDIUM
                      }}>
                      Prikaži više
                  </Text>
              </PressableOpacity>
          </View>
        }

      </View>
  )
}

export default CategoryItems
