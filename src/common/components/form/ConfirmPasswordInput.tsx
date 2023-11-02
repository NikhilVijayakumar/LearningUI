// src/common/components/form/ConfirmPasswordInput.tsx

import React from 'react'
import TextField from '@mui/material/TextField'

interface ConfirmPasswordInputProps {
  literal: Record<string, string>
  onConfirmPasswordUpdate: (confirmPassword: string) => void
}

const ConfirmPasswordInput: React.FC<ConfirmPasswordInputProps> = ({
  literal,
  onConfirmPasswordUpdate,
}) => {
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onConfirmPasswordUpdate(event.target.value)
  }

  return (
    <TextField
      fullWidth
      label={literal['confirm_password']}
      variant="standard"
      margin="normal"
      required
      type="password"
      onChange={handleConfirmPasswordChange}
    />
  )
}

export default ConfirmPasswordInput
