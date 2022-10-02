import React from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import CategoryItems from '../components/organisms/category-items'
import { IProduct } from '../interfaces/endpoints'
import { Colors } from '../style'

const SpecialOffer = () => {
  const { products } = useSelector((state: any) => state.products)

  const dateNow = new Date().getTime().toString().substr(0, 10)

  return (
    <FlatList style={{ flex: 1, backgroundColor: Colors.themeColor().background }}
      data={products.filter((p: IProduct) => dateNow >= p.startAt && dateNow <= p.endAt && p.categoryId === '1')}
      renderItem={({ item }) => {
        return <CategoryItems categoryId={item.categoryId} categoryTitle='Posebna ponuda' showButton={false} />
      }}

    />
  )
}

export default SpecialOffer
