// Theme colors
export const darkTheme = {
  primary: '#F56A4D',
  primaryLight: '#FEEFEC',
  secondary: '#9DE47C',
  secondaryLight: 'rgba(157,228,124,0.35)',
  cardBackground: '#FCFCFC',
  textPrimary: '#000000',
  textSecondary: '#9F9D9D',
  btnInfo: '#4C6EC5',
  btnError: '#D44F4F',
  successText: '#9DE47C',
  background: '#FFFFFF',
  backgroundDark: '#000000'
}

export const lightTheme = {
  primary: '#F56A4D',
  primaryLight: '#FEEFEC',
  secondary: '#9DE47C',
  secondaryLight: 'rgba(157,228,124,0.35)',
  cardBackground: '#FCFCFC',
  textPrimary: '#000000',
  textSecondary: '#9F9D9D',
  btnInfo: '#4C6EC5',
  btnError: '#D44F4F',
  successText: '#9DE47C',
  background: '#FFFFFF',
  backgroundDark: '#000000'
}

// Color theme selector
export const themeColor = () => {
  const currentThemeType = 'light'

  if (currentThemeType === 'light') {
    return lightTheme
  } else {
    return darkTheme
  }
}

// Opacity setup
export const DISABLED_OPACITY = 0.4
export const OPACITY_80 = 0.8
