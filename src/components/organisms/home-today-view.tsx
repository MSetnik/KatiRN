import React from 'react'
import { ScrollView } from 'react-native'
import { Typography } from '../../style'
import CategoryPill from '../atoms/category-pill'
import CategoryItems from './category-items'

const HomeTodayView = () => {
  return (
    <>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
            paddingHorizontal: Typography.FONT_SIZE_TITLE_MD,
            }}
            style={{
            flexGrow: 0,
            marginBottom: Typography.FONT_SIZE_NORMAL / 2,
            }}
            >
            <CategoryPill text={'meso'} selected />
            <CategoryPill text={'za kuću'} />
            <CategoryPill text={'ostalo'} />
            <CategoryPill text={'higijena'} />
            <CategoryPill text={'grickalice'} />
            <CategoryPill text={'za kupatilo'} />
            <CategoryPill text={'voce i povrce'} />
            <CategoryPill text={'matko'} />
            <CategoryPill text={'matko'} />
        </ScrollView>
        <ScrollView
            style={{
            flex:1
            }}
            contentContainerStyle={{
            paddingBottom: Typography.FONT_SIZE_TITLE_LG
        }}>
            

            <CategoryItems categoryTitle='Posebna ponuda' showButton={true} isHorizontal={true} />
            <CategoryItems categoryTitle='Meso' showButton={false} />
            <CategoryItems categoryTitle='Za kuću' showButton={false} />

        </ScrollView>
    </>
  )
}

export default HomeTodayView