import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import PressableOpacity from '../components/atoms/PressableOpacity'
import ViewpagerHeader from '../components/molecules/viewpager-header'
import HomeTodayView from '../components/organisms/home-today-view'
import { getCategories, getStoreData } from '../endpoints/firestore'
import { ICategory, IStores } from '../interfaces/endpoints'
import { fetchCatalogs } from '../store/catalog-slice'
import { fetchCategories, setCategories } from '../store/category-slice'
import { fetchAllProducts } from '../store/product-stlice'
import { fetchStores, setStores } from '../store/store-slice'
import { Colors } from '../style'
import HomeCatalogs from './home-catalogs'

interface Props {
  navigation: any
}

const Home: React.FC<Props> = (props: any) => {
  const [selectedElementIndex, setSelectedElementIndex] = useState(0)

  // redux
  const dispatch = useDispatch()
  const { loading } = useSelector((state: any) => state.categories)
  const { products } = useSelector((state: any) => state.products)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchStores())
    dispatch(fetchAllProducts())
    dispatch(fetchCatalogs())
  }, [])

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
            <PressableOpacity
              onPress={() => props!.navigation.navigate('ShoppingList')}
            >
              <Text>Lista</Text>
            </PressableOpacity>
      )
    })
  }, [props.navigation])

  return (
    <View
      style={{
        backgroundColor: Colors.themeColor().background,
        flex: 1
      }}>
      <ViewpagerHeader setSelectedElementIndex={setSelectedElementIndex} />

      {
        selectedElementIndex === 0 &&
          <HomeTodayView navigation={props.navigation} />
      }

      {
        selectedElementIndex === 1 &&
        <>
           <HomeCatalogs navigation={props.navigation} />
        </>
      }
    </View>
  )
}

export default Home
