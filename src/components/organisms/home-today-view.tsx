import React, { useState, useRef } from 'react'
import { ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { ICategory } from '../../interfaces/endpoints'
import { Typography } from '../../style'
import CategoryPill from '../atoms/category-pill'
import CategoryItems from './category-items'

const HomeTodayView = (props: any) => {
  // const dispatch = useDispatch();
  const { categories } = useSelector((state: any) => state.categories)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  console.log(props)

  const scrollViewRef: any = useRef()
  return (
    <>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: Typography.FONT_SIZE_TITLE_MD
            }}
            style={{
              flexGrow: 0,
              marginBottom: Typography.FONT_SIZE_NORMAL / 2
            }}>
                {
                  categories.map((category: ICategory, index: number) => (
                    <CategoryPill
                      key={index}
                      text={category.name}
                      selected={index === selectedIndex}
                      onPress={() => {
                        setSelectedIndex(index)
                        scrollViewRef.current.scrollTo({ y: 500, animated: true })
                      }}
                    />

                  ))
                }
        </ScrollView>
        <ScrollView
          style={{
            flex: 1
          }}
          contentContainerStyle={{
            paddingBottom: Typography.FONT_SIZE_TITLE_LG
          }}
          ref={scrollViewRef}>

            <CategoryItems
              categoryTitle='Posebna ponuda'
              showButton={true}
              isHorizontal={true}
              onPress={() => props.navigation.navigate('SpecialOffer')} />
            <CategoryItems categoryTitle='Meso' showButton={false} />
            <CategoryItems categoryTitle='Za kuću' showButton={false} />

        </ScrollView>
    </>
  )
}

export default HomeTodayView
