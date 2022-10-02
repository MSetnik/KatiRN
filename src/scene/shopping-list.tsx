import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

interface Props {
    navigation: any
}

const ShoppingList: React.FC<Props> = ({ navigation }) => {
  const { shoppingList } = useSelector((state: any) => state.shoppingList)

  return (
    <FlatList
        style={{
          flex: 1
        }}
        data={shoppingList}
        renderItem={({ item, index }) => {
          return <View key={index}>
                <Text>
                    {item.name}
                </Text>
            </View>
        }}
    />
  )
}

export default ShoppingList
