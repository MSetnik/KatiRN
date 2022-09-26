import { StyleSheet } from 'react-native'

// Boje
import * as Colors from './colors'

export const shadow = StyleSheet.create({
  elevation2: {
    elevation: 2,
    shadowColor: Colors.themeColor().backgroundDark,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62
  },
  elevation5: {
    elevation: 5,
    shadowColor: Colors.themeColor().backgroundDark,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  elevation8: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8
  }
})
