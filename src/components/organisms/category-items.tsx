import React, { useCallback, useEffect } from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import { Double } from 'react-native/Libraries/Types/CodegenTypes'
import { useSelector } from 'react-redux'
import { ICategory, IProduct, IStores } from '../../interfaces/endpoints'
import { Colors, Typography } from '../../style'
import PressableOpacity from '../atoms/PressableOpacity'
import ItemCard from '../molecules/item-card'

interface Props {
    categoryId: string,
    categoryTitle: string,
    showButton: boolean,
    isHorizontal?: boolean,
    onPress?: () => {},
    setSelectedCategory?: any,
}

const CategoryItems : React.FC<Props> = (props) => {
  const { stores } = useSelector((state: any) => state.stores)
  const { products } = useSelector((state: any) => state.products)
  const { categories } = useSelector((state: any) => state.categories)

  const getStoreImg = (storeId: string) => {
    const imgArray = stores.map((store: IStores) => {
      let img: any
      if (store.id === storeId) {
        img = store.imgUrl
        return img
      }

      return null
    })

    const img = imgArray.filter(Boolean)
    return img[0]
  }

  useEffect(() => {
    if (products.length !== 0) {
      getStoreImg(products[0].storeId)
    }
  }, [products])

  const calculatePercentage = (discountedPrice: number, fullPrice: number) : string => {
    console.log(discountedPrice)
    console.log(fullPrice)
    const percent = (100 - (fullPrice * 100) / discountedPrice)

    return percent.toFixed(0)
  }

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

  const onViewableItemsChanged = useCallback<any>(({ viewableItems }) => {
  // do something with viewableItems here. It’s a list of items in the viewport.
    if (viewableItems.length !== 0 && props.setSelectedCategory !== undefined) {
      // if(viewableItems[viewableItems.length - 1].item.categoryId)
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].id === viewableItems[viewableItems.length - 1].item.categoryId) {
          console.log(viewableItems)
          // console.log(checkIfCategoryHasItems().length - 1 + 'from items')
          props.setSelectedCategory(checkIfCategoryHasItems(i).currentCategoryIndex - 2)
          // console.log(checkIfCategoryHasItems(i).currentCategoryIndex)
        }
      }

      // console.log(viewableItems)
    }
  }, [])
  return (
    <View>
        <Text
          style={{
            marginLeft: Typography.FONT_SIZE_TITLE_MD,
            marginTop: Typography.FONT_SIZE_TITLE_MD / 2,
            fontWeight: Typography.FONT_WEIGHT_MEDIUM
          }}>
          {props.categoryTitle}
        </Text>

        {
          props.isHorizontal
            ? <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={products}
            contentContainerStyle={{
              paddingLeft: Typography.FONT_SIZE_TITLE_MD / 2
            }}
            style={{
              paddingBottom: Typography.FONT_SIZE_NORMAL / 2
            }}
            renderItem={({ item }) => {
              // if (item.categoryId === props.categoryId) {
              //   return <ItemCard
              //     imgUrl={item.imgUrl}
              //     itemName={item.name}
              //     itemDescription={item.description}
              //     itemDiscountPercent={((parseFloat(item.discountedPrice) / parseFloat(item.fullPrice)) * 100).toFixed(0)}
              //     itemDiscountedPrice={item.discountedPrice}
              //     itemFullPrice={item.fullPrice}
              //     itemDiscountedPriceEur={(parseFloat(item.discountedPrice) / 7.53450).toFixed(2)}
              //     itemFullPriceEur={(parseFloat(item.fullPrice) / 7.53450).toFixed(2)}
              //     storeLogoUrl={getStoreImg(item.storeId)}
              //   />
              // } else {
              //   return null
              // }
              if (item.categoryId === '1') {
                return <ItemCard
                  imgUrl={item.imgUrl}
                  itemName={item.name}
                  itemDescription={item.description}
                  itemDiscountPercent={calculatePercentage(item.discountedPrice, item.fullPrice)}
                  itemDiscountedPrice={item.discountedPrice}
                  itemFullPrice={item.fullPrice}
                  itemDiscountedPriceEur={(item.discountedPrice / 7.53450).toFixed(2)}
                  itemFullPriceEur={(item.fullPrice / 7.53450).toFixed(2)}
                  storeLogoUrl={getStoreImg(item.storeId)}
                />
              }
            }}
            />
            : <FlatList
                numColumns={2}
                // horizontal={props.isHorizontal}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={products.filter(p => p.categoryId === props.categoryId)}
                contentContainerStyle={{
                  marginLeft: '5%'
                }}
                style={{
                  alignSelf: 'auto',
                  marginLeft: '6%'
                }}
                onViewableItemsChanged={ onViewableItemsChanged }
                viewabilityConfig={ viewabilityConfig }
                renderItem={({ item }) => {
                  if (item.categoryId === props.categoryId) {
                    return <ItemCard
                      imgUrl={item.imgUrl}
                      itemName={item.name}
                      itemDescription={item.description}
                      itemDiscountPercent={calculatePercentage(item.discountedPrice, item.fullPrice)}
                      itemDiscountedPrice={item.discountedPrice}
                      itemFullPrice={item.fullPrice}
                      itemDiscountedPriceEur={(item.discountedPrice / 7.53450).toFixed(2)}
                      itemFullPriceEur={(item.fullPrice / 7.53450).toFixed(2)}
                      storeLogoUrl={getStoreImg(item.storeId)}
                    />
                  } else {
                    return null
                  }
                }}
              />
        }

        {/* <ScrollView
          horizontal={props.isHorizontal}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: Typography.FONT_SIZE_TITLE_MD / 2
          }}
          style={{
            paddingBottom: Typography.FONT_SIZE_NORMAL / 2
          }}>
            {
                products.map((p: IProduct, i: number) => {
                  if (p.categoryId === props.categoryId) {
                    return props.isHorizontal
                      ? <>
                          <ItemCard
                              imgUrl=""
                              itemName="Piletina"
                              itemDescription="1 kg"
                              itemDiscountPercent="20%"
                              itemDiscountedPrice="49,99 kn"
                              itemFullPrice="69,99 kn"
                              itemDiscountedPriceEur="7,49 eur"
                              itemFullPriceEur="10,99 eur"
                              storeLogoUrl={stores.length !== 0 ? stores[3].imgUrl : undefined }
                          />
                          <ItemCard
                              imgUrl=""
                              itemName="Piletina"
                              itemDescription="1 kg"
                              itemDiscountPercent="20%"
                              itemDiscountedPrice="49,99 kn"
                              itemFullPrice="69,99 kn"
                              itemDiscountedPriceEur="7,49 eur"
                              itemFullPriceEur="10,99 eur"
                              storeLogoUrl={stores.length !== 0 ? stores[2].imgUrl : undefined }
                          />
                          <ItemCard
                              imgUrl=""
                              itemName="Piletina"
                              itemDescription="1 kg"
                              itemDiscountPercent="20%"
                              itemDiscountedPrice="49,99 kn"
                              itemFullPrice="69,99 kn"
                              itemDiscountedPriceEur="7,49 eur"
                              itemFullPriceEur="10,99 eur"
                              storeLogoUrl={stores.length !== 0 ? stores[1].imgUrl : undefined }
                          />
                          <ItemCard
                              imgUrl=""
                              itemName="Piletina"
                              itemDescription="1 kg"
                              itemDiscountPercent="20%"
                              itemDiscountedPrice="49,99 kn"
                              itemFullPrice="69,99 kn"
                              itemDiscountedPriceEur="7,49 eur"
                              itemFullPriceEur="10,99 eur"
                              storeLogoUrl={stores.length !== 0 ? stores[4].imgUrl : undefined }
                          />
                      </>
                      : <View key={i}>
                          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                              <ItemCard
                                  imgUrl={p.imgUrl}
                                  itemName={p.name}
                                  itemDescription={p.description}
                                  itemDiscountPercent={((parseFloat(p.discountedPrice) / parseFloat(p.fullPrice)) * 100).toFixed(0)}
                                  itemDiscountedPrice={p.discountedPrice}
                                  itemFullPrice={p.fullPrice}
                                  itemDiscountedPriceEur={(parseFloat(p.discountedPrice) / 7.53450).toFixed(2)}
                                  itemFullPriceEur={(parseFloat(p.fullPrice) / 7.53450).toFixed(2)}
                                  storeLogoUrl={stores.length !== 0 ? stores.map((store: IStores) => store.id === p.storeId && store.imgUrl) : undefined }
                              />
                              <ItemCard
                                  imgUrl=""
                                  itemName="Piletina"
                                  itemDescription="1 kg"
                                  itemDiscountPercent="20%"
                                  itemDiscountedPrice="49,99 kn"
                                  itemFullPrice="69,99 kn"
                                  itemDiscountedPriceEur="7,49 eur"
                                  itemFullPriceEur="10,99 eur"
                                  storeLogoUrl={stores.length !== 0 ? stores[0].imgUrl : undefined }
                              />
                          </View>
                          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                              <ItemCard
                                  imgUrl=""
                                  itemName="Piletina"
                                  itemDescription="1 kg"
                                  itemDiscountPercent="20%"
                                  itemDiscountedPrice="49,99 kn"
                                  itemFullPrice="69,99 kn"
                                  itemDiscountedPriceEur="7,49 eur"
                                  itemFullPriceEur="10,99 eur"
                                  storeLogoUrl={stores.length !== 0 ? stores[4].imgUrl : undefined }
                              />
                              <ItemCard
                                  imgUrl=""
                                  itemName="Piletina"
                                  itemDescription="1 kg"
                                  itemDiscountPercent="20%"
                                  itemDiscountedPrice="49,99 kn"
                                  itemFullPrice="69,99 kn"
                                  itemDiscountedPriceEur="7,49 eur"
                                  itemFullPriceEur="10,99 eur"
                                  storeLogoUrl={stores.length !== 0 ? stores[3].imgUrl : undefined }
                              />
                          </View>
                      </View>
                  } else {
                    return null
                  }
                })
            }

        </ScrollView> */}

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
