//path src/common/components/form/PasswordInput.tsx

import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'
import { PasswordInputProps } from './formData'

const PasswordInput: React.FC<PasswordInputProps> = ({
  literal,
  onPasswordUpdate,
}) => {
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordValid, setPasswordValid] = useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const isStrongPassword = (password: string): void => {
    if (password.length < 8) {
      setPasswordError(literal['required_password'])
      setPasswordValid(false)
      return
    }
    const strongPasswordRegex =
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    let valid = strongPasswordRegex.test(password)
    if (!valid) {
      setPasswordError(literal['invalid_password'])
      setPasswordValid(false)
    }
    setPasswordValid(true)
  }

  const handlePasswordPaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
  ) => {
    const updatedPasswordValue = event.clipboardData.getData('text')
    // setPassword(updatedPasswordValue)
    isStrongPassword(updatedPasswordValue)
    onPasswordUpdate({
      password: updatedPasswordValue,
      passwordValid: passwordValid,
    })
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = event.target.value
    setPassword(passwordValue)
    isStrongPassword(passwordValue)
    onPasswordUpdate({ password: passwordValue, passwordValid: passwordValid })
  }

  return (
    <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      <Input
        required
        id="standard-adornment-password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        onPaste={handlePasswordPaste}
        error={!passwordValid}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {!passwordValid && (
        <Typography variant="caption" color="error">
          {passwordError}
        </Typography>
      )}
    </FormControl>
  )
}

export default PasswordInput
