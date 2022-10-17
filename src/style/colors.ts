// Theme colors
export const darkTheme = {
  primary: '#0DAF6F',
  primaryLight: '#59E29E',
  primaryDark: '#007E43',
  secondary: '#000000',
  secondaryLight: 'rgba(157,228,124,0.35)',
  cardBackground: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#9F9D9D',
  btnInfo: '#4C6EC5',
  btnError: '#D44F4F',
  successText: '#0DAF6F',
  background: '#FFFFFF',
  backgroundDark: '#000000',
  borderColor: 'rgba(0,0,0, 0.2)'
}

export const lightTheme = {
  primary: '#F56A4D',
  primaryLight: '#FEEFEC',
  primaryDark: '#007E43',
  secondary: '#9DE47C',
  secondaryLight: 'rgba(157,228,124,0.35)',
  cardBackground: '#FCFCFC',
  textPrimary: '#000000',
  textSecondary: '#9F9D9D',
  btnInfo: '#4C6EC5',
  btnError: '#D44F4F',
  successText: '#9DE47C',
  background: '#FFFFFF',
  backgroundDark: '#000000',
  borderColor: 'rgba(0,0,0, 0.1)'

}

// Color theme selector
export const themeColor = () => {
  const currentThemeType = 'dark'

  if (currentThemeType === 'light') {
    return lightTheme
  } else {
    return darkTheme
  }
}

// Opacity setup
export const DISABLED_OPACITY = 0.4
export const OPACITY_80 = 0.8
