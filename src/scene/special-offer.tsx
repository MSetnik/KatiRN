import React from 'react'
import { ScrollView } from 'react-native'
import CategoryItems from '../components/organisms/category-items'
import { Colors } from '../style'

const SpecialOffer = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.themeColor().background }}>
        <CategoryItems categoryTitle='Posebna ponuda' showButton={false} />
    </ScrollView>
  )
}

export default SpecialOffer
