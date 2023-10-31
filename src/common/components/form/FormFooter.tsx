import React, { useContext } from 'react'
import Grid from '@mui/material/Grid'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme, darkTheme } from '../../../themes/appTheme'
import { ThemeContext } from '../../../common/theme/themeContext'

const FormFooter: React.FC = () => {
  const themeContext = useContext(ThemeContext)

  return (
    <ThemeProvider theme={themeContext.darkMode ? darkTheme : lightTheme}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          background: themeContext.darkMode ? 'black' : 'white',
          borderTop: '1px solid #ccc',
          padding: '10px 0',
          color: themeContext.darkMode ? 'white' : 'black',
        }}
      >
        <p>
          &copy; {new Date().getFullYear()} Skill Sage. All rights reserved.
        </p>
      </Grid>
    </ThemeProvider>
  )
}

export default FormFooter
