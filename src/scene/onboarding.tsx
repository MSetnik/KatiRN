import React, { useRef } from 'react'
import { Image, Text, View } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import PressableOpacity from '../components/atoms/PressableOpacity'
import { Colors, Typography } from '../style'

interface Props {
  navigation: any
}

const OnBoarding : React.FC<Props> = ({ navigation }) => {
  const onboardingRef : any = useRef<Onboarding>(null)
  return (
    <Onboarding
        ref={onboardingRef}
        onSkip={() => {
          onboardingRef.current.goToPage(3, true)
        }}
        DoneButtonComponent={() => <PressableOpacity onPress={() => navigation.replace('Home')}><Text style={{ marginRight: 20, color: Colors.themeColor().background, fontSize: Typography.FONT_SIZE_NORMAL }}>Nastavi</Text></PressableOpacity>}
        pages={[
          {
            backgroundColor: Colors.themeColor().background,
            image: <Image style={{ borderRadius: Typography.FONT_SIZE_TITLE_MD / 2, resizeMode: 'cover' }} source={require('../assets/onboarding/onboarding1.png')} />,
            title: 'Aktivni katalozi na jednome mjestu',
            subtitle: 'Jednostavan prikaz kataloga kako bi vam olakšali kupovinu'
          },
          {
            backgroundColor: Colors.themeColor().primaryDark,
            image: <Image style={{ borderRadius: Typography.FONT_SIZE_TITLE_MD / 2 }} source={require('../assets/onboarding/onboarding2.png')} />,
            title: 'Spremanje proizvoda',
            subtitle: 'Spremite proizvod u košaricu kako bi si napravili popis za trgovinu'
          },
          {
            backgroundColor: Colors.themeColor().background,
            image: <Image style={{ borderRadius: Typography.FONT_SIZE_TITLE_MD / 2 }} source={require('../assets/onboarding/onboarding3.png')} />,
            title: 'Vaša košarica vas čeka',
            subtitle: 'Spremljeni proizvodi na jednome mjestu, prikazani po trgovini za lakše snalaženje'
          },
          {
            backgroundColor: Colors.themeColor().primaryDark,
            image: <Image style={{ borderRadius: Typography.FONT_SIZE_TITLE_MD / 2 }} source={require('../assets/onboarding/onboarding4.png')} />,
            title: 'Ujedno i popis za trgovinu',
            subtitle: 'Jednostavno dodavanje bilježaka ukoliko želite dodati proizvod kojega nema na akciji'
          }
        ]}
    />
  )
}

export default OnBoarding
