import moment from 'moment'
import 'moment/locale/hr'
import React from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'
import CatalogCard from '../components/molecules/catalog-card'
import { getCurrentCatalogs, getStoresFromCatalogsWithProducts } from '../helpers'
import { ICatalog, IStores } from '../interfaces/endpoints'
import { Typography } from '../style'
import CatalogView from './catalog-view'

interface Props {
    navigation: any,
}

const HomeCatalogs: React.FC<Props> = ({ navigation }) => {
  const { stores } = useSelector((state: any) => state.stores)
  const { catalog } = useSelector((state: any) => state.catalogs)
  const { products } = useSelector((state: any) => state.products)

  const dateNow = new Date().getTime().toString().substr(0, 10)

  const momentLocale = moment.locale('hr')

  getCurrentCatalogs(products, catalog, stores)

  return (
    <FlatList style={{
      flex: 1
    }}
    contentContainerStyle={{
      alignItems: 'center',
      paddingBottom: Typography.FONT_SIZE_TITLE_MD,
      marginTop: -Typography.FONT_SIZE_TITLE_MD / 2
    }}
      // data={getStoresFromCatalogsWithProducts(products, catalog, stores)}
      data={getCurrentCatalogs(products, catalog, stores)}
      renderItem={({ item, index }) => {
        return (
          <CatalogCard
            key={index}
            onPress={() => {
              navigation.navigate('CatalogView', { storeId: item.storeId, storeName: item.storeName, catalogId: item.catalogId })
            }}
            storeName={item.storeName}
            storeLogo={item.storeImg}
            catalogDate={`Od ${moment.unix(item.catalogFrom).format('dddd')} ${moment.unix(item.catalogFrom).format('DD.MM')} do ${moment.unix(item.catalogFrom).format('dddd')} ${moment.unix(item.catalogTo).format('DD.MM')}`}
           />
        )
      }}
    />
  )
}

export default HomeCatalogs
