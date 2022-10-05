import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View, Text, ActivityIndicator, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
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
import { Colors, Typography } from '../style'
import HomeCatalogs from './home-catalogs'
import Lottie from 'lottie-react-native'
import { getShoppingList, storeShoppingList } from '../async-storage'
import { addToList, loadFromAsync } from '../store/shopping-list-slice'

interface Props {
  navigation: any
}

const Home: React.FC<Props> = (props: any) => {
  const [selectedElementIndex, setSelectedElementIndex] = useState(0)

  // redux
  const dispatch = useDispatch()
  const { products } = useSelector((state: any) => state.products)
  const { loading, shoppingList } = useSelector((state: any) => state.shoppingList)

  const animationRef = useRef<Lottie>(null)
  const [fetchingData, setFetchingData] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      Promise.all([
        dispatch(fetchCategories()),
        dispatch(fetchStores()),
        dispatch(fetchAllProducts()),
        dispatch(fetchCatalogs()),
        getShoppingList()
      ])
        .then((resp) => {
          dispatch(loadFromAsync(resp[4]))
          setFetchingData(false)

          if (resp[4].length !== 0) {
            return Alert.alert(
              'Nastavljate li kupnju?',
              'Vaš popis sadrži proizvode. Želite li nastaviti stvarati popis ili započeti novi?',
              [
                {
                  text: 'Nastavi',
                  onPress: () => console.log('Cancel Pressed')
                },
                {
                  text: 'Započni novi',
                  onPress: () => {
                    dispatch(loadFromAsync([]))
                  }
                }
              ]
            )
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }

    fetchData()
  }, [])

  if (loading) {
    setTimeout(() => {
      animationRef.current?.play()
    }, 1000)
  }

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <PressableOpacity
          onPress={() => props!.navigation.navigate('ShoppingList')}
        >
          <Lottie
            style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
            ref={animationRef}
            source={require('../assets/lottie/cart-icon-added.json')}
            loop={false}
            speed={1.5}
          />
        </PressableOpacity>
      )
    })
  }, [props.navigation])

  if (fetchingData) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.themeColor().background, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color={Colors.themeColor().primary} />
      </View>
    )
  }

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
