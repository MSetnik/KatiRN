import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Colors, Typography } from '../../style'
import PressableOpacity from '../atoms/PressableOpacity'

interface Props {
    setSelectedElementIndex: (selectedIndex: number) => void | any,
}

const ViewpagerHeader : React.FC<Props> = (props) => {
  const [selectedEl, setSelectedEl] = useState(0)

  return (
    <View style={{
      flexDirection: 'row',
      paddingHorizontal: Typography.FONT_SIZE_TITLE_MD,
      paddingVertical: Typography.FONT_SIZE_TITLE_LG / 2
    }}>
        <PressableOpacity onPress={() => {
          props.setSelectedElementIndex(0)
          setSelectedEl(0)
        }}>
            <Text style={{ color: Colors.themeColor().primary }}>Današnja ponuda</Text>

            {
                selectedEl === 0 &&
                <View style={{
                  backgroundColor: 'red',
                  height: 1,
                  width: '100%',
                  marginTop: Typography.FONT_SIZE_NORMAL / 2
                }}/>
            }
        </PressableOpacity>

        <PressableOpacity style={{ marginLeft: Typography.FONT_SIZE_TITLE_LG }}
           onPress={() => {
             props.setSelectedElementIndex(1)
             setSelectedEl(1)
           }}>
            <Text style={{ color: Colors.themeColor().primary }}>Ponuda po katalogu</Text>
            {
                selectedEl === 1 &&
                <View style={{
                  backgroundColor: 'red',
                  height: 1,
                  width: '100%',
                  marginTop: Typography.FONT_SIZE_NORMAL / 2
                }}/>
            }
        </PressableOpacity>
    </View>
  )
}

export default ViewpagerHeader
