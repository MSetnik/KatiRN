import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { storeShoppingList } from '../async-storage'
import CategoryPill from '../components/atoms/category-pill'
import CategoryItems from '../components/organisms/category-items'
import { checkIfCatalogCategoryHasItemsHelper, checkIfCategoryHasItemsHelper, getProductsFromStoreCatalog } from '../helpers'
import { ICatalog, ICategory, IProduct } from '../interfaces/endpoints'
import { globalStore } from '../store'
import { fetchStoreCatalog } from '../store/catalog-slice'
import { Colors, Typography } from '../style'

interface Props {
  navigation: any,
  route: any
}

const CatalogView: React.FC<Props> = ({ navigation, route }) => {
  const storeId = route.params.storeId
  const storeName = route.params.storeName
  const [productsFromCatalog, setProductsFromCatalog] = useState<IProduct[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // ref
  const productsListRef = useRef<FlatList>(null)

  const dispatch = useDispatch()
  const { storeCatalog } = useSelector((state:any) => state.catalogs)
  const { products } = useSelector((state:any) => state.products)
  const { categories } = useSelector((state:any) => state.categories)
  const { shoppingList } = useSelector((state:any) => state.shoppingList)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: storeName + ' Katalog'
    })
  })

  useEffect(() => {
    const fetchStoreCatalogs = async () => {
      setIsLoading(true)
      if (storeId !== undefined) {
        await dispatch(fetchStoreCatalog(storeId))
      }
    }

    fetchStoreCatalogs().then(() => {
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    if (storeCatalog.length !== 0) {
      let catalogData: any = null
      storeCatalog.forEach((storeCatalog: ICatalog) => {
        if (storeCatalog.storeId === storeId) {
          catalogData = storeCatalog
        }
      })

      if (catalogData !== null) {
        setProductsFromCatalog(getProductsFromStoreCatalog(catalogData, products))
      }
    }
  }, [storeCatalog])

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.themeColor().background, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color={Colors.themeColor().primary} />
      </View>
    )
  }

  return (
   <View style={{
     flex: 1,
     backgroundColor: Colors.themeColor().background
   }}>
     {
        productsFromCatalog.length !== 0
          ? (
          <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: Typography.FONT_SIZE_TITLE_MD,
              marginTop: Typography.FONT_SIZE_TITLE_MD / 2
            }}
            style={{
              flexGrow: 0,
              marginBottom: Typography.FONT_SIZE_NORMAL / 2
            }}>

            {
              checkIfCategoryHasItemsHelper(categories, productsFromCatalog).map((category: ICategory, index: number) => {
                return <CategoryPill
                  key={index}
                  text={category.name}
                  selected={index === selectedIndex}
                  onPress={() => {
                    setSelectedIndex(index)
                    productsListRef.current?.scrollToIndex({
                      index,
                      animated: true
                    })
                  }}
                />
              })
            }

          </ScrollView>

          <FlatList
            style={{
              flex: 1
            }}
            contentContainerStyle={{
              paddingBottom: Typography.FONT_SIZE_TITLE_MD * 2
            }}
            ref={productsListRef}
            initialScrollIndex={selectedIndex}
            data={checkIfCatalogCategoryHasItemsHelper(categories, productsFromCatalog)}
            renderItem={({ item, index }) => {
              return <CategoryItems key={index} categoryTitle={item.name} categoryId={item.id} showButton={false} storeId={storeId} setSelectedCategory={setSelectedIndex} />
            }}/>
        </>)
          : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: Colors.themeColor().textPrimary }}>Nema proizvoda u katalogu</Text>
        </View>
}
   </View>
  )
}

export default CatalogView
