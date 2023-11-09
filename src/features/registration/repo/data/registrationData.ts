// src/features/registration/repo/data/registrationData.ts
import { AppState } from '../../../../common/utils/AppState'
import {
  EmailState,
  PasswordState,
} from '../../../../common/components/form/formData'
import { AuthUser } from '../../../../common/auth/authData'

export interface RegistrationData {
  userName: string
  email: string
  password: string
  confirmPassword: string
}

export type RegistrationRequest = {
  email: string
  password: string
  userName: string
}

export type RegistrationEmailState = EmailState
export type RegistrationPasswordState = PasswordState

export interface RegistrationState<RegistrationResponse>
  extends EmailState,
    PasswordState,
    AppState<RegistrationResponse> {
  data: RegistrationResponse | null
  userName: string
  confirmPassword: string
  confirmPasswordValid: boolean
}

export type RegistrationResponse = {
  message: string
  user: AuthUser
}


export interface RegistrationProps {
  literal: Record<string, string>
  appstate: RegistrationState<RegistrationResponse>
  handleRegistration: () => Promise<void>
  setState: (
    emailState: RegistrationEmailState | null,
    passwordState: RegistrationPasswordState | null,
    userName: string | null,
    confirmPassword: RegistrationPasswordState | null,
  ) => void
}