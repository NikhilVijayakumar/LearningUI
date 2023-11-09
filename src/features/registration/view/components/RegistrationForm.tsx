// src/features/registration/view/components/RegistrationForm.tsx

import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LockOutlinedIcon from '@mui/icons-material/LockPersonOutlined'
import { useNavigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { lightTheme, darkTheme } from '../../../../themes/appTheme'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { ThemeContext } from '../../../../common/theme/themeContext'
import { StateType } from '../../../../common/utils/AppState'
import FormHeader from '../../../../common/components/form/FormHeader'
import EmailInput from '../../../../common/components/form/EmailInput'
import PasswordInput from '../../../../common/components/form/PasswordInput'
import ThemeToggle from '../../../../common/components/theme/ThemeToggle'
import Alert from '@mui/material/Alert'
import {
  RegistrationProps,
  RegistrationEmailState,
  RegistrationPasswordState,  
} from '../../repo/data/registrationData'
import { useEffect } from 'react'
import FormContainer from '../../../../common/components/form/FormContainer'
import { defaultFormStyle } from '../../../../common/components/form/style/FormStyle'
import { UrlList } from '../../../../common/routes/UrlList'
import UserNameInput from '../../../../common/components/form/UserNameInput'
import FormFooter from '../../../../common/components/form/FormFooter'

const RegistrationForm = (props: RegistrationProps) => {
  const navigate = useNavigate()
  const { literal, appstate, handleRegistration, setState } = props
  const themeContext = React.useContext(ThemeContext)

  const onEmailUpdate = (emailState: RegistrationEmailState) => {
    setState(emailState, null, null, null)
  }

  const onPasswordUpdate = (passwordState: RegistrationPasswordState) => {
    setState(null, passwordState, null, null)
  }

  const onUserNameUpdate = (userName: string) => {
    setState(null, null, userName, null)
  }

  const onConfirmPasswordUpdate = (
    confirmPasswordState: RegistrationPasswordState,
  ) => {
    setState(null, null, null, confirmPasswordState)
  }

  useEffect(() => {
    if (appstate.isSuccess && appstate.data) {
      console.log('Registration success', appstate.data)
      navigate(UrlList.LOGIN)
    } else if (appstate.isError) {
      showError()
    }
  }, [appstate])

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await handleRegistration()

    if (appstate.isSuccess && appstate.data) {
      console.log('Registration success', appstate.data)
      navigate(UrlList.LOGIN)
    }
  }

  const showError = () => {
    if (appstate.isError) {
      return (
        <Box>
          <Alert severity="error">{appstate.statusMessage}</Alert>
        </Box>
      )
    }
  }

  return (
    <ThemeProvider theme={themeContext.darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <FormContainer sx={defaultFormStyle}>
          <ThemeToggle themeContext={themeContext} />
          <form onSubmit={handleFormSubmit}>
            <FormHeader icon={<PersonAddIcon />} title={literal['sign_up']} />

            <UserNameInput
              literal={literal}
              onUserNameUpdate={onUserNameUpdate}
            />
            <EmailInput literal={literal} onEmailUpdate={onEmailUpdate} />
            <PasswordInput
              literal={literal}
              onPasswordUpdate={onPasswordUpdate}
            />
            <PasswordInput
              literal={literal}
              onPasswordUpdate={onConfirmPasswordUpdate}
            />
            <Grid
              container
              justifyContent="end"
              alignItems="center"
              sx={{
                marginBottom: '16px',
                marginTop: '16px',
              }}
            >
              <Grid item>
                <LoadingButton
                  color="primary"
                  type="submit"
                  loading={appstate.state === StateType.LOADING}
                  loadingPosition="start"
                  startIcon={<LockOutlinedIcon />}
                  variant="contained"
                >
                  <span>{literal['sign_up']}</span>
                </LoadingButton>
              </Grid>
            </Grid>
            {showError()}
            <FormFooter />
          </form>
        </FormContainer>
      </Container>
    </ThemeProvider>
  )
}

export default RegistrationForm