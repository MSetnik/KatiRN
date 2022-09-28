import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/scene/home'
import SpecialOffer from './src/scene/special-offer'
import CatalogView from './src/scene/catalog-view'

import { Provider } from 'react-redux'
import { globalStore } from './src/store'

const Stack = createNativeStackNavigator()

export default function App () {
  return (
    <Provider store={globalStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SpecialOffer" component={SpecialOffer} />
          <Stack.Screen name="CatalogView" component={CatalogView} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
