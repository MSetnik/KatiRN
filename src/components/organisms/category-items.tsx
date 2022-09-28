import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { Colors, Typography } from '../../style'
import PressableOpacity from '../atoms/PressableOpacity'
import ItemCard from '../molecules/item-card'

interface Props {
    categoryTitle: string,
    showButton: boolean,
    isHorizontal?: boolean,
    onPress?: () => {}
}

const CategoryItems : React.FC<Props> = (props) => {
  const { stores } = useSelector((state: any) => state.stores)

  return (
    <View>
        <Text
          style={{
            marginLeft: Typography.FONT_SIZE_TITLE_MD,
            marginTop: Typography.FONT_SIZE_TITLE_MD / 2,
            fontWeight: Typography.FONT_WEIGHT_MEDIUM
          }}>
          {props.categoryTitle}
        </Text>

        <ScrollView
          horizontal={props.isHorizontal}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: Typography.FONT_SIZE_TITLE_MD / 2
          }}
          style={{
            paddingBottom: Typography.FONT_SIZE_NORMAL / 2
          }}>
            {
                props.isHorizontal
                  ? <>
                    <ItemCard
                        imgUrl=""
                        itemName="Piletina"
                        itemDescription="1 kg"
                        itemDiscountPercent="20%"
                        itemDiscountedPrice="49,99 kn"
                        itemFullPrice="69,99 kn"
                        itemDiscountedPriceEur="7,49 eur"
                        itemFullPriceEur="10,99 eur"
                        storeLogoUrl={stores.length !== 0 ? stores[3].imgUrl : undefined }
                    />
                    <ItemCard
                        imgUrl=""
                        itemName="Piletina"
                        itemDescription="1 kg"
                        itemDiscountPercent="20%"
                        itemDiscountedPrice="49,99 kn"
                        itemFullPrice="69,99 kn"
                        itemDiscountedPriceEur="7,49 eur"
                        itemFullPriceEur="10,99 eur"
                        storeLogoUrl={stores.length !== 0 ? stores[2].imgUrl : undefined }
                    />
                    <ItemCard
                        imgUrl=""
                        itemName="Piletina"
                        itemDescription="1 kg"
                        itemDiscountPercent="20%"
                        itemDiscountedPrice="49,99 kn"
                        itemFullPrice="69,99 kn"
                        itemDiscountedPriceEur="7,49 eur"
                        itemFullPriceEur="10,99 eur"
                        storeLogoUrl={stores.length !== 0 ? stores[1].imgUrl : undefined }
                    />
                    <ItemCard
                        imgUrl=""
                        itemName="Piletina"
                        itemDescription="1 kg"
                        itemDiscountPercent="20%"
                        itemDiscountedPrice="49,99 kn"
                        itemFullPrice="69,99 kn"
                        itemDiscountedPriceEur="7,49 eur"
                        itemFullPriceEur="10,99 eur"
                        storeLogoUrl={stores.length !== 0 ? stores[4].imgUrl : undefined }
                    />
                 </>
                  : <>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <ItemCard
                            imgUrl=""
                            itemName="Piletina"
                            itemDescription="1 kg"
                            itemDiscountPercent="20%"
                            itemDiscountedPrice="49,99 kn"
                            itemFullPrice="69,99 kn"
                            itemDiscountedPriceEur="7,49 eur"
                            itemFullPriceEur="10,99 eur"
                            storeLogoUrl={stores.length !== 0 ? stores[3].imgUrl : undefined }
                        />
                        <ItemCard
                            imgUrl=""
                            itemName="Piletina"
                            itemDescription="1 kg"
                            itemDiscountPercent="20%"
                            itemDiscountedPrice="49,99 kn"
                            itemFullPrice="69,99 kn"
                            itemDiscountedPriceEur="7,49 eur"
                            itemFullPriceEur="10,99 eur"
                            storeLogoUrl={stores.length !== 0 ? stores[0].imgUrl : undefined }
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <ItemCard
                            imgUrl=""
                            itemName="Piletina"
                            itemDescription="1 kg"
                            itemDiscountPercent="20%"
                            itemDiscountedPrice="49,99 kn"
                            itemFullPrice="69,99 kn"
                            itemDiscountedPriceEur="7,49 eur"
                            itemFullPriceEur="10,99 eur"
                            storeLogoUrl={stores.length !== 0 ? stores[4].imgUrl : undefined }
                        />
                        <ItemCard
                            imgUrl=""
                            itemName="Piletina"
                            itemDescription="1 kg"
                            itemDiscountPercent="20%"
                            itemDiscountedPrice="49,99 kn"
                            itemFullPrice="69,99 kn"
                            itemDiscountedPriceEur="7,49 eur"
                            itemFullPriceEur="10,99 eur"
                            storeLogoUrl={stores.length !== 0 ? stores[3].imgUrl : undefined }
                        />
                    </View>
                 </>

            }

        </ScrollView>

          {
            props.showButton &&
            <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: Typography.FONT_SIZE_TITLE_MD,
                  justifyContent: 'center',
                  marginBottom: Typography.FONT_SIZE_TITLE_MD / 2

                }}>
                <PressableOpacity
                onPress={props.onPress ? props.onPress : () => {}}
                style={{
                  backgroundColor: Colors.themeColor().primary,
                  flex: 1,
                  alignItems: 'center',
                  borderRadius: Typography.FONT_SIZE_TITLE_MD / 2,
                  paddingVertical: Typography.FONT_SIZE_TITLE_MD / 2
                }}>
                    <Text
                        style={{
                          color: Colors.themeColor().background,
                          fontWeight: Typography.FONT_WEIGHT_MEDIUM
                        }}>
                        Prikaži više
                    </Text>
                </PressableOpacity>
            </View>
          }

      </View>
  )
}

export default CategoryItems
