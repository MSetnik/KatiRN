/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import CategoryPill from '../components/atoms/category-pill';
import PressableOpacity from '../components/atoms/PressableOpacity';
import ItemCard from '../components/molecules/item-card';
import ViewpagerHeader from '../components/molecules/viewpager-header';
import CategoryItems from '../components/organisms/category-items';
import HomeTodayView from '../components/organisms/home-today-view';
import { firestore } from '../endpoints/firebase-init';
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

      {
        selectedElementIndex === 0 &&
          <HomeTodayView />
      }

      {
        selectedElementIndex === 1 &&
        <>
           <Text>Katalog</Text>
        </>
      }
    </View>
  );
};

export default Home;
