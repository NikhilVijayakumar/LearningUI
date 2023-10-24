// src/features/login/store/types/loginTypes.ts

import { AppState } from '../../../../common/utils/AppState'
import {
  EmailState,
  PasswordState,
} from '../../../../common/components/form/formData'
import { AuthUser } from '../../../../common/auth/authData'

export type LoginRequest = {
  email: string
  password: string
}

export type LoginEmailState = EmailState
export type LoginPasswordState = PasswordState

export interface LoginState<LoginResponse>
  extends EmailState,
    PasswordState,
    AppState<LoginResponse> {}

export type LoginResponse = {
  message: string
  user: AuthUser
}

export interface LoginProps {
  literal: Record<string, string>
  appstate: LoginState<LoginResponse>
  handleLogin: () => Promise<void>
  setState: (
    emailState: LoginEmailState | null,
    passwordState: LoginPasswordState | null,
  ) => void
  setUser: (user: AuthUser) => void
}
