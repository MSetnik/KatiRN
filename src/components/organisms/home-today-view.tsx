/* eslint-disable array-callback-return */
import React, { useState, useRef, useEffect } from 'react'
import { Dimensions, FlatList, ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { ICategory } from '../../interfaces/endpoints'
import { Typography } from '../../style'
import CategoryPill from '../atoms/category-pill'
import CategoryItems from './category-items'

// helpers
import { checkIfCategoryHasItemsHelper } from '../../helpers'
import { storeShoppingList } from '../../async-storage'

const HomeTodayView = (props: any) => {
  const { categories } = useSelector((state: any) => state.categories)
  const { products } = useSelector((state: any) => state.products)
  const { shoppingList } = useSelector((state: any) => state.shoppingList)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<ICategory[]>([])

  // ref
  const productsListRef = useRef<FlatList>(null)

  useEffect(() => {
    setCategoriesWithProducts(checkIfCategoryHasItemsHelper(categories, products))
  }, [categories, products])

  if (categoriesWithProducts.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', marginTop: Dimensions.get('window').height / 3 }}>
        <Text>Nema proizvoda na akciji za današnji dan.</Text>
      </View>
    )
  }

  return (
    <>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: Typography.FONT_SIZE_TITLE_MD
            }}
            style={{
              flexGrow: 0,
              marginBottom: Typography.FONT_SIZE_TITLE_MD / 2
            }}>
                {
                  categoriesWithProducts.map((category: ICategory, index: number) => {
                    // if (category.id !== '1') {
                    return (<CategoryPill
                        key={index}
                        text={category.name}
                        selected={false}
                        onPress={() => {
                          setSelectedIndex(index)
                          productsListRef.current?.scrollToIndex({
                            index,
                            animated: true
                          })
                        }}
                      />)
                    // }
                  })
                }
        </ScrollView>
        {
          categoriesWithProducts.length !== 0 &&
          <FlatList
          style={{
            flex: 1
          }}
          contentContainerStyle={{
            paddingBottom: Typography.FONT_SIZE_TITLE_MD * 2
          }}
          ref={productsListRef}
          initialScrollIndex={selectedIndex}
          data={categoriesWithProducts}
          renderItem={({ item, index }) => {
            if (index === 0 && item.id === '1') {
              return <>
               <CategoryItems
                  categoryId={'1'}
                  categoryTitle='Posebna ponuda'
                  showButton={true}
                  isHorizontal={true}
                  onPress={() => props.navigation.navigate('SpecialOffer')}
                  />
              </>
            } else {
              return <CategoryItems key={index} categoryTitle={item.name} categoryId={item.id} showButton={false} setSelectedCategory={setSelectedIndex} />
            }
          }}/>
        }

    </>
  )
}

export default HomeTodayView
