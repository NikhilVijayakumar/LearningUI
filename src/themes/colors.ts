import { red, blue, grey } from '@mui/material/colors'

const colors = {
  light: {
    primary: blue[500], // Blue is a good choice for the primary color
    secondary: red[700], // A slightly deeper red for the secondary color
    background: grey[100], // A lighter grey for the light background
    surface: grey[300], // A medium grey for the light surface
    text: grey[900], // Black for light text on light backgrounds
  },
  dark: {
    primary: blue[500], // Blue is a good choice for the primary color
    secondary: red[700], // A slightly deeper red for the secondary color
    background: grey[900], // A dark grey for the dark background
    surface: grey[700], // A slightly darker grey for the dark surface
    text: grey[100], // White for dark text on dark backgrounds
  },
}

export default colors
