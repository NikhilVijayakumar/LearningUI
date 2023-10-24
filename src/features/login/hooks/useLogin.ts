// path src/features/login/hooks/useLogin.ts
import { loginApi as api } from '../repo/remote/loginApi'
import {
  LoginResponse,
  LoginState,
  LoginEmailState,
  LoginPasswordState,
} from '../repo/data/loginData'
import { useState } from 'react'
import { HttpStatusCode } from '../../../common/repo/HttpStatusCode'
import { StateType } from '../../../common/utils/AppState'
import useStatusMessage from '../../../common/repo/useStatusMessage'

const useLogin = (literal: Record<string, string>) => {
  const [appstate, setAppState] = useState<LoginState<LoginResponse>>({
    state: StateType.INIT,
    isError: false,
    isSuccess: false,
    status: HttpStatusCode.IDLE,
    statusMessage: '',
    data: null,
    email: '',
    emailValid: false,
    password: '',
    passwordValid: false,
  })

  const setState = (
    emailState: LoginEmailState | null,
    passwordState: LoginPasswordState | null,
  ) => {
    if (emailState) {
      console.log('emailState', emailState)
      setAppState((prevState) => ({
        ...prevState,
        email: emailState.email,
        emailValid: emailState.emailValid,
      }))
    }
    if (passwordState) {
      console.log('passwordState', passwordState)
      setAppState((prevState) => ({
        ...prevState,
        password: passwordState.password,
        passwordValid: passwordState.passwordValid,
      }))
    }
  }

  const handleLogin = async () => {
    if (!appstate.emailValid) {
      return
    }
    if (!appstate.passwordValid) {
      return
    }
    const request = {
      email: appstate.email,
      password: appstate.password,
    }

    setAppState((prevState) => ({
      ...prevState,
      state: StateType.LOADING,
    }))

    try {
      const response = await api(request, literal)
      if (
        response.isSuccess &&
        response.data !== null &&
        response.data !== undefined
      ) {
        setAppState((prevState) => ({
          ...prevState,
          state: StateType.COMPLETED,
          isSuccess: true,
          status: response.status,
          statusMessage: useStatusMessage(response.status, literal),
          data: response.data!!,
        }))
      } else {
        setAppState((prevState) => ({
          ...prevState,
          state: StateType.COMPLETED,
          isError: true,
          status: response.status,
          statusMessage: useStatusMessage(response.status, literal),
        }))
      }
    } catch (error) {
      setAppState((prevState) => ({
        ...prevState,
        state: StateType.COMPLETED,
        isError: true,
        status: HttpStatusCode.INTERNET_ERROR,
        statusMessage: useStatusMessage(HttpStatusCode.INTERNET_ERROR, literal),
      }))
    }
  }

  return {
    appstate,
    setState,
    handleLogin,
  }
}

export default useLogin
