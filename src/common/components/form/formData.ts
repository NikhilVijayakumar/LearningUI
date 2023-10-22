//path src/common/components/form/formData.ts

import { Dayjs } from 'dayjs'

export interface EmailState {
  email: string
  emailValid: boolean
}

export interface PasswordState {
  password: string
  passwordValid: boolean
}

export interface EmailInputProps {
  literal: Record<string, string>
  onEmailUpdate: (state: EmailState) => void
}

export interface PasswordInputProps {
  literal: Record<string, string>
  onPasswordUpdate: (state: PasswordState) => void
}

export type Date = Dayjs | null

export interface DateComponentProps {
  label: string
  date: string
  onDateUpdate: (date: Date) => void
}
