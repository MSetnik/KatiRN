import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { getStoreData } from '../../endpoints/firestore'
import { IStores } from '../../interfaces/endpoints'
import { Colors, Typography } from '../../style'
import PressableOpacity from '../atoms/PressableOpacity'
import ItemCard from '../molecules/item-card'

interface Props {
    categoryTitle: string,
    showButton: boolean,
    isHorizontal?: boolean
}



const CategoryItems : React.FC<Props> = (props) => {
    const [stores, setStores] = useState<IStores[]>([])

    useEffect(() => {
        const fetchStores = async () => {
            await getStoreData().then((resp: any[]) => {
                setStores(resp)
            })
        }

        fetchStores()
    },[])


  return (
    <View>
        <Text
          style={{
            marginLeft: Typography.FONT_SIZE_TITLE_MD,
            marginTop:  Typography.FONT_SIZE_TITLE_MD / 2,
            fontWeight: Typography.FONT_WEIGHT_MEDIUM
          }}>
          {props.categoryTitle}
        </Text>

        <ScrollView
          horizontal={props.isHorizontal}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: Typography.FONT_SIZE_TITLE_MD / 2,
          }}
          style={{
            paddingBottom: Typography.FONT_SIZE_NORMAL / 2,
          }}>
            {
                props.isHorizontal ?
                <>
                    <ItemCard
                        imgUrl=""
                        itemName="Piletina"
                        itemDescription="1 kg"
                        itemDiscountPercent="20%"
                        itemDiscountedPrice="49,99 kn"
                        itemFullPrice="69,99 kn"
                        itemDiscountedPriceEur="7,49 eur"
                        itemFullPriceEur="10,99 eur"
                        storeLogoUrl={stores.length !== 0 ? stores[3].imgUrl : '' }
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
                        storeLogoUrl={stores.length !== 0 ? stores[2].imgUrl : '' }
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
                        storeLogoUrl={stores.length !== 0 ? stores[1].imgUrl : '' }
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
                        storeLogoUrl={stores.length !== 0 ? stores[4].imgUrl : '' }
                    />
                 </> : 
                 <>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <ItemCard
                            imgUrl=""
                            itemName="Piletina"
                            itemDescription="1 kg"
                            itemDiscountPercent="20%"
                            itemDiscountedPrice="49,99 kn"
                            itemFullPrice="69,99 kn"
                            itemDiscountedPriceEur="7,49 eur"
                            itemFullPriceEur="10,99 eur"
                            storeLogoUrl={stores.length !== 0 ? stores[3].imgUrl : '' }
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
                            storeLogoUrl={stores.length !== 0 ? stores[0].imgUrl : '' }
                        />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <ItemCard
                            imgUrl=""
                            itemName="Piletina"
                            itemDescription="1 kg"
                            itemDiscountPercent="20%"
                            itemDiscountedPrice="49,99 kn"
                            itemFullPrice="69,99 kn"
                            itemDiscountedPriceEur="7,49 eur"
                            itemFullPriceEur="10,99 eur"
                            storeLogoUrl={stores.length !== 0 ? stores[4].imgUrl : '' }
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
                            storeLogoUrl={stores.length !== 0 ? stores[3].imgUrl : '' }
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
                    marginBottom: Typography.FONT_SIZE_TITLE_MD / 2,

                }}>
                <PressableOpacity
                onPress={() => {}}
                style={{
                    backgroundColor: Colors.themeColor().primary,
                    flex: 1,
                    alignItems: 'center',
                    borderRadius: Typography.FONT_SIZE_TITLE_MD / 2,
                    paddingVertical: Typography.FONT_SIZE_TITLE_MD / 2,
                }}>
                <Text
                    style={{
                    color: Colors.themeColor().background,
                    fontWeight: Typography.FONT_WEIGHT_MEDIUM,
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