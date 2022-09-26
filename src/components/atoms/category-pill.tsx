import React from 'react'
import { Text, View } from 'react-native'
import { Colors, Typography } from '../../style'
import PressableOpacity from './PressableOpacity'

interface Props {
    text: string,
    onPress?: () => void,
    selected?: boolean,
    style?: object,
    isDisabled?: boolean,
    textStyle?: object
}

const CategoryPill : React.FC<Props> = (props) => {
  return (
    <PressableOpacity
        isDisabled={props.isDisabled}
        onPress={() => {}}
        style={[{
          borderRadius: 50,
          backgroundColor: props.selected ? Colors.themeColor().secondary : Colors.themeColor().secondaryLight,
          zIndex: 1,
          paddingHorizontal: Typography.FONT_SIZE_NORMAL,
          marginRight: Typography.FONT_SIZE_NORMAL * 0.5,
          paddingVertical: Typography.FONT_SIZE_TITLE_MD * 0.2,
          alignSelf: 'flex-start'
        }, props.style]}
    >
        <Text style={[{ fontSize: Typography.FONT_SIZE_TITLE_LG / 2 }, props.textStyle]}>
            {props.text}
        </Text>
    </PressableOpacity>
  )
}

export default CategoryPill
