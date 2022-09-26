/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import CategoryPill from '../components/atoms/category-pill';
import PressableOpacity from '../components/atoms/PressableOpacity';
import ItemCard from '../components/molecules/item-card';
import ViewpagerHeader from '../components/molecules/viewpager-header';
import {Colors, Typography} from '../style';

const Home = () => {
  const [selectedElementIndex, setSelectedElementIndex] = useState(0);
  return (
    <View
      style={{
        backgroundColor: Colors.themeColor().background,
        flex: 1,
      }}>
      <ViewpagerHeader setSelectedElementIndex={setSelectedElementIndex} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Typography.FONT_SIZE_TITLE_MD,
        }}
        style={{
          flexGrow: 0,
          marginBottom: Typography.FONT_SIZE_NORMAL / 2,
        }}>
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

      <View style={{}}>
        <Text
          style={{
            marginLeft: Typography.FONT_SIZE_TITLE_MD,
            marginTop: Typography.FONT_SIZE_TITLE_MD / 2,
          }}>
          Posebna ponuda
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: Typography.FONT_SIZE_TITLE_MD / 2,
          }}
          style={{
            paddingBottom: Typography.FONT_SIZE_NORMAL / 2,
          }}>
          <ItemCard
            imgUrl=""
            itemName="Piletina"
            itemDescription="1 kg"
            itemDiscountPercent="20%"
            itemDiscountedPrice="49,99 kn"
            itemFullPrice="69,99 kn"
            itemDiscountedPriceEur="7,49 eur"
            itemFullPriceEur="10,99 eur"
            storeLogoUrl=""
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
            storeLogoUrl=""
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
            storeLogoUrl=""
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
            storeLogoUrl=""
          />
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: Typography.FONT_SIZE_TITLE_MD,
            justifyContent: 'center',
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
      </View>

      <Text>Home</Text>
    </View>
  );
};

export default Home;
