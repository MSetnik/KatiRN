import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/scene/home'
import SpecialOffer from './src/scene/special-offer'
import CatalogView from './src/scene/catalog-view'

import { Provider } from 'react-redux'
import { globalStore } from './src/store'
import ShoppingList from './src/scene/shopping-list'
import { Colors } from './src/style'

const Stack = createNativeStackNavigator()

export default function App () {
  return (
    <Provider store={globalStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{
            title: 'Ponuda',
            headerTitleStyle: {
              color: Colors.themeColor().background
            },
            headerStyle: {
              backgroundColor: Colors.themeColor().primary
            }
          }}/>
          <Stack.Screen name="SpecialOffer" component={SpecialOffer} options={{
            title: 'Posebna ponuda',
            headerTitleStyle: {
              color: Colors.themeColor().background
            },
            headerStyle: {
              backgroundColor: Colors.themeColor().primary
            }
          }} />
          <Stack.Screen name="CatalogView" component={CatalogView} options={{
            headerTitleStyle: {
              color: Colors.themeColor().background
            },
            headerStyle: {
              backgroundColor: Colors.themeColor().primary
            }
          }} />
          <Stack.Screen name="ShoppingList" component={ShoppingList} options={{
            presentation: 'modal',
            title: 'Shopping lista',
            headerTitleStyle: {
              color: Colors.themeColor().background
            },
            headerStyle: {
              backgroundColor: Colors.themeColor().primary
            }
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
