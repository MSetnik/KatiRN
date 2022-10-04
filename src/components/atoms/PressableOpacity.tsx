import React, { useState } from 'react'
import { Pressable } from 'react-native'

interface Props {
    style?: object;
    children: React.ReactNode,
    onPress: ((params: any) => void | any) | undefined ;
    isDisabled?: boolean
}

const PressableOpacity : React.FC<Props> = (props) => {
  const [opacity, setOpacity] = useState(1)
  return (
    <Pressable
        style={[{ opacity }, props.style]}
        onPress={props.isDisabled ? () => {} : props.onPress}
        onPressIn={() => !props.isDisabled && setOpacity(0.5)}
        onPressOut={() => !props.isDisabled && setOpacity(1)}
        hitSlop={5}
    >
        {props.children}
    </Pressable>
  )
}

export default PressableOpacity
