import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import LoginIcon from '@mui/icons-material/Login'
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
import FormFooter from '../../../../common/components/form/FormFooter'
import EmailInput from '../../../../common/components/form/EmailInput'
import PasswordInput from '../../../../common/components/form/PasswordInput'
import ThemeToggle from '../../../../common/components/theme/ThemeToggle'
import Alert from '@mui/material/Alert'
import {
  LoginProps,
  LoginEmailState,
  LoginPasswordState,
} from '../../repo/data/loginData'
import { useEffect } from 'react'
import FormContainer from '../../../../common/components/form/FormContainer'
import { defaultFormStyle } from '../../../../common/components/form/style/FormStyle'
import { UrlList } from '../../../../common/routes/UrlList'
import Button from '@mui/material/Button'
import HowToRegIcon from '@mui/icons-material/HowToReg'

const LoginForm = (props: LoginProps) => {
  const navigate = useNavigate()
  const { literal, appstate, handleLogin, setState, setUser } = props
  const themeContext = React.useContext(ThemeContext)

  const onEmailUpdate = (emailState: LoginEmailState) => {
    setState(emailState, null)
  }

  const onPasswordUpdate = (passwordState: LoginPasswordState) => {
    setState(null, passwordState)
  }

  useEffect(() => {
    if (appstate.isSuccess && appstate.data) {
      console.log('Login success', appstate.data)
      let user = appstate.data
      setUser(user)
      navigate(UrlList.TOPIC)
    } else if (appstate.isError) {
      showError()
    }
  }, [appstate.data, appstate.isError, appstate.isSuccess])

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await handleLogin()
  }

  const showError = () => {
    if (appstate.isError) {
      return (
        <Box>
          <Alert severity="error">{appstate.statusMessage}</Alert>{' '}
        </Box>
      )
    }
  }

  const handleRegisterClick = () => {
    navigate(UrlList.REGISTRATION)
  }

  return (
    <ThemeProvider theme={themeContext.darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <FormContainer sx={defaultFormStyle}>
          <ThemeToggle themeContext={themeContext} />
          <form onSubmit={handleFormSubmit}>
            <FormHeader
              icon={<LockOutlinedIcon />}
              title={literal['sign_in']}
            />

            <EmailInput literal={literal} onEmailUpdate={onEmailUpdate} />
            <PasswordInput
              literal={literal}
              onPasswordUpdate={onPasswordUpdate}
            />
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{
                marginBottom: '16px',
                marginTop: '16px',
              }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<HowToRegIcon />}
                  onClick={handleRegisterClick}
                >
                  <span>{literal['sign_up']}</span>
                </Button>
              </Grid>
              <Grid item>
                <LoadingButton
                  color="primary"
                  type="submit"
                  loading={appstate.state === StateType.LOADING}
                  loadingPosition="start"
                  startIcon={<LoginIcon />}
                  variant="contained"
                >
                  <span>{literal['sign_in']}</span>
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

export default LoginForm
