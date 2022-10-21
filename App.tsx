import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/scene/home'
import SpecialOffer from './src/scene/special-offer'
import CatalogView from './src/scene/catalog-view'

import { Provider } from 'react-redux'
import { globalStore } from './src/store'
import ShoppingList from './src/scene/shopping-list'
import { Colors } from './src/style'
import OnBoarding from './src/scene/onboarding'
import { getIsFirstVisit } from './src/async-storage'
import { ActivityIndicator, View } from 'react-native'

const Stack = createNativeStackNavigator()

export default function App () {
  const [isFirst, setIsFIrst] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getVisit = async () => {
      await getIsFirstVisit().then((resp:boolean) => {
        setIsFIrst(resp)
        setIsLoading(false)
      })
        .catch((e: any) => {
          console.log(e)
        })
    }
    getVisit()
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={Colors.themeColor().primary} />
      </View>
    )
  }
  return (
    <Provider store={globalStore}>
      <NavigationContainer>
          {
            isFirst
              ? <Stack.Navigator>
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
              : <Stack.Navigator>
                  <Stack.Screen name="Onboarding" component={OnBoarding} options={{
                    headerStyle: {
                      backgroundColor: Colors.themeColor().primary
                    },
                    headerShown: false
                  }}/>
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
          }

      </NavigationContainer>
    </Provider>
  )
}
