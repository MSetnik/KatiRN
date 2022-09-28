import React from 'react'
import { ScrollView, View } from 'react-native'
import CategoryPill from '../components/atoms/category-pill'
import CategoryItems from '../components/organisms/category-items'
import { Colors, Typography } from '../style'

interface Props {
  navigation: any
}

const CatalogView: React.FC<Props> = ({ navigation }) => {
  return (
   <View style={{
     flex: 1,
     backgroundColor: Colors.themeColor().background
   }}>
     <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Typography.FONT_SIZE_TITLE_MD,
          marginTop: 10
        }}
        style={{
          flexGrow: 0,
          marginBottom: Typography.FONT_SIZE_NORMAL / 2
        }}>

          <CategoryPill
            text={'meso'}
            selected
            onPress={() => {

            }}
          />
          <CategoryPill
            text={'meso'}
            onPress={() => {

            }}
          />
          <CategoryPill
            text={'meso'}
            onPress={() => {

            }}
          />
          <CategoryPill
            text={'meso'}
            onPress={() => {

            }}
          />

      </ScrollView>

      <ScrollView
          style={{
            flex: 1
          }}
          contentContainerStyle={{
            paddingBottom: Typography.FONT_SIZE_TITLE_LG
          }}
          >
            <CategoryItems categoryTitle='Meso' showButton={false} />
            <CategoryItems categoryTitle='Za kuću' showButton={false} />

        </ScrollView>

   </View>
  )
}

export default CatalogView
