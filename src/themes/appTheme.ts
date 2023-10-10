import { createTheme } from '@mui/material/styles'
import colors from './colors'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.light.primary,
    },
    secondary: {
      main: colors.light.secondary,
    },
    background: {
      default: colors.light.background,
      paper: colors.light.surface,
    },
    text: {
      primary: colors.light.text,
    },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.dark.primary,
    },
    secondary: {
      main: colors.dark.secondary,
    },
    background: {
      default: colors.dark.background,
      paper: colors.dark.surface,
    },
    text: {
      primary: colors.dark.text,
    },
  },
})

export { lightTheme, darkTheme }
