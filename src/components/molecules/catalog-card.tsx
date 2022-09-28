import React from 'react'
import { Image, Text, View } from 'react-native'
import { Colors, SharedStyles, Typography } from '../../style'
import PressableOpacity from '../atoms/PressableOpacity'

interface Props {
    storeName: string,
    storeLogo: string,
    catalogDate: string,
    style?: object,
    onPress: () => void
}

const CatalogCard: React.FC<Props> = ({ storeName, storeLogo, catalogDate, style, onPress }) => {
  return (
    <PressableOpacity
        onPress={onPress}
        style={[SharedStyles.shadow.elevation5, {
          borderRadius: Typography.FONT_SIZE_TITLE_MD / 2,
          width: '90%',
          height: Typography.FONT_SIZE_TITLE_MD * 5,
          marginTop: Typography.FONT_SIZE_TITLE_MD,
          flexDirection: 'row',
          backgroundColor: Colors.themeColor().cardBackground,
          padding: Typography.FONT_SIZE_TITLE_MD / 2
        }, style]
    }>
        <Image style={{ aspectRatio: 1 / 1, resizeMode: 'contain', borderRadius: Typography.FONT_SIZE_TITLE_MD / 4 }} source={{ uri: storeLogo }} />

        <View style={[{ flex: 1, justifyContent: 'center', paddingHorizontal: Typography.FONT_SIZE_MEDIUM }]}>
            <Text style={{
              fontSize: Typography.FONT_SIZE_NORMAL,
              fontWeight: Typography.FONT_WEIGHT_NORMAL,
              marginBottom: Typography.FONT_SIZE_NORMAL / 4
            }}>{storeName}</Text>

            <Text style={{ fontSize: Typography.FONT_SIZE_SMALL }}>{catalogDate}</Text>
        </View>
    </PressableOpacity>
  )
}

export default CatalogCard
