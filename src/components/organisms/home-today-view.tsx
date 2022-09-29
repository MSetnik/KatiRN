/* eslint-disable array-callback-return */
import React, { useState, useRef, useEffect } from 'react'
import { FlatList, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { ICategory, IProduct } from '../../interfaces/endpoints'
import { Typography } from '../../style'
import CategoryPill from '../atoms/category-pill'
import CategoryItems from './category-items'

const HomeTodayView = (props: any) => {
  // const dispatch = useDispatch();
  const { categories } = useSelector((state: any) => state.categories)
  const { products } = useSelector((state: any) => state.products)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<ICategory[]>([])

  // ref
  const productsListRef = useRef<FlatList>(null)

  const checkIfCategoryHasItems = () => {
    const categoriesWithProductsHelper: ICategory[] = []
    categories.map((c: ICategory) => {
      let hasCategoryItems: boolean = false
      products.map((p: IProduct) => {
        if (p.categoryId === c.id && !hasCategoryItems && p.categoryId !== '1') {
          categoriesWithProductsHelper.push(c)
          hasCategoryItems = true
        }
      })
    })

    setCategoriesWithProducts(categoriesWithProductsHelper)
  }

  useEffect(() => {
    checkIfCategoryHasItems()
  }, [categories, products])

  console.log(selectedIndex)

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
              marginBottom: Typography.FONT_SIZE_NORMAL / 2
            }}>
                {
                  categoriesWithProducts.map((category: ICategory, index: number) => (
                    <CategoryPill
                      key={index}
                      text={category.name}
                      selected={index === selectedIndex}
                      onPress={() => {
                        setSelectedIndex(index)
                        productsListRef.current?.scrollToIndex({
                          index,
                          animated: true
                        })
                        // productsListRef.current.scrollToIndex(0.2)
                      }}
                    />

                  ))
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
            if (index === 0) {
              return <>
               <CategoryItems
                  categoryId={'1'}
                  categoryTitle='Posebna ponuda'
                  showButton={true}
                  isHorizontal={true}
                  onPress={() => props.navigation.navigate('SpecialOffer')} />

                <CategoryItems key={index} categoryTitle={item.name} categoryId={item.id} showButton={false} setSelectedCategory={setSelectedIndex}/>

              </>
            }
            return <CategoryItems key={index} categoryTitle={item.name} categoryId={item.id} showButton={false} setSelectedCategory={setSelectedIndex} />
          }}/>
        }

    </>
  )
}

export default HomeTodayView
