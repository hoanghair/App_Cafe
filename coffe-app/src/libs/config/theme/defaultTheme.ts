import { Platform } from 'react-native'
import { DefaultTheme, useTheme } from 'react-native-paper'

export const defaultTheme = {
  ...DefaultTheme,
  custom: 'property',
  colors: {
    ...DefaultTheme.colors,
    primary: '#B3282D',
    secondary: '#49CFED',
    background: '#fff',
    backgroundYellow: '#F9F7D1',
    error: '#F0A69B',
    text: '#fff',
    borderInput: '#252836',
    textGray: '#545454',
    textRed: '#D4102A',
    secondaryText: '#8F8F8F',
    placeholder: '#C0C0C0',
    divider: '#D4D4D4',
    borderBack: '#E8ECF4',
    textForgot: '#6A707C',
    grey: '#92929D',
    backgroundMain: '#1F1D2B',
    borderColor: '#252836',
  },
}

export const BANNER_HEIGHT = Platform.select({ ios: 325, android: 315 })
export const SECTION_RADIUS = 20
export const TAB_BAR_HEIGHT = Platform.OS === 'android' ? 70 : 80
export const PADDING_HORIZONTAL_CONTAINER = 10

export type AppTheme = typeof defaultTheme
export const useAppTheme = () => useTheme<AppTheme>()
