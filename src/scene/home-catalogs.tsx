import React from 'react'
import { FlatList, ScrollView, View } from 'react-native'
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
    <FlatList style={{
      flex: 1
    }}
    contentContainerStyle={{
      alignItems: 'center',
      paddingBottom: Typography.FONT_SIZE_TITLE_MD,
      marginTop: -Typography.FONT_SIZE_TITLE_MD / 2
    }}
      data={stores}
      renderItem={({ item }) => {
        return (
          <CatalogCard
            onPress={() => {
              navigation.navigate('CatalogView', { storeId: item.id, storeName: item.name })
            }}
            storeName={item.name}
            storeLogo={item.imgUrl}
            catalogDate='Od ponedjeljka 28.9 do srijede 31.9.'
           />
        )
      }}
    />
  )
}

export default HomeCatalogs
