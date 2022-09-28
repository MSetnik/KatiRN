import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ViewpagerHeader from '../components/molecules/viewpager-header'
import HomeTodayView from '../components/organisms/home-today-view'
import { getCategories, getStoreData } from '../endpoints/firestore'
import { ICategory, IStores } from '../interfaces/endpoints'
import { fetchCategories, setCategories } from '../store/category-slice'
import { fetchStores, setStores } from '../store/store-slice'
import { Colors } from '../style'
import HomeCatalogs from './home-catalogs'

const Home = (props: any) => {
  const [selectedElementIndex, setSelectedElementIndex] = useState(0)

  // redux
  const dispatch = useDispatch()
  const { loading } = useSelector((state: any) => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchStores())
  }, [])

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
