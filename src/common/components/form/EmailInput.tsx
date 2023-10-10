//path src/common/components/form/EmaiInput.tsx

import React, { useState } from 'react'
import TextField from '@mui/material/TextField'

import { EmailInputProps } from './formData'

const EmailInput: React.FC<EmailInputProps> = ({ literal, onEmailUpdate }) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value

    let valid = emailValue.length > 0
    if (valid) {
      valid = emailRegex.test(emailValue)
      if (!valid) {
        setEmailError(literal['invalid_email_format'])
      }
    } else {
      setEmailError(literal['Email is required'])
    }
    setEmailValid(valid)
    if (valid) {
      setEmailError('')
    }
    onEmailUpdate({ email: emailValue, emailValid: emailValid })
    setEmail(emailValue)
  }

  const onEmailPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const updatedEmailValue = event.clipboardData.getData('text')

    let valid = updatedEmailValue.length > 0
    if (valid) {
      valid = emailRegex.test(updatedEmailValue)
      if (!valid) {
        setEmailError(literal['invalid_email_format'])
      }
    } else {
      setEmailError(literal['Email is required'])
    }
    setEmailValid(valid)
    onEmailUpdate({ email: updatedEmailValue, emailValid: emailValid })
  }

  return (
    <TextField
      required
      variant="standard"
      type="text"
      label={literal['email']}
      name="email"
      value={email}
      error={!emailValid}
      onChange={onEmailChange}
      onPaste={onEmailPaste}
      helperText={emailError}
      fullWidth
      margin="normal"
    />
  )
}

export default EmailInput
