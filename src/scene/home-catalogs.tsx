import React from 'react'
import { ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'
import CatalogCard from '../components/molecules/catalog-card'
import { IStores } from '../interfaces/endpoints'
import { Typography } from '../style'
import CatalogView from './catalog-view'

interface Props {
    navigation: any,
}

const HomeCatalogs: React.FC<Props> = ({ navigation }) => {
  const { stores } = useSelector((state: any) => state.stores)

  return (
    <ScrollView style={{
      flex: 1
    }}
    contentContainerStyle={{
      alignItems: 'center',
      paddingBottom: Typography.FONT_SIZE_TITLE_MD,
      marginTop: -Typography.FONT_SIZE_TITLE_MD / 2
    }}>

        <CatalogCard
            onPress={() => {
              navigation.navigate('CatalogView')
            }}
            storeName='Lidl'
            storeLogo={stores[0].imgUrl}
            catalogDate='Od ponedjeljka 28.9 do srijede 31.9.'
        />

        <CatalogCard
            onPress={() => {
              navigation.navigate('CatalogView')
            }}
            storeName='Lidl'
            storeLogo={stores[1].imgUrl}
            catalogDate='12.12.2012.'
        />

        <CatalogCard
            onPress={() => {
              navigation.navigate('CatalogView')
            }}
          storeName='Lidl'
          storeLogo={stores[2].imgUrl}
          catalogDate='12.12.2012.'
        />

        <CatalogCard
            onPress={() => {
              navigation.navigate('CatalogView')
            }}
           storeName='Lidl'
           storeLogo={stores[3].imgUrl}
           catalogDate='12.12.2012.'
        />

        <CatalogCard
            onPress={() => {
              navigation.navigate('CatalogView')
            }}
           storeName='Lidl'
           storeLogo={stores[4].imgUrl}
           catalogDate='12.12.2012.'
        />

    </ScrollView>
  )
}

export default HomeCatalogs
