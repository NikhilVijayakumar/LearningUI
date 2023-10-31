// src/common/components/form/UserNameInput.tsx

import React from 'react'
import TextField from '@mui/material/TextField'

interface UserNameInputProps {
  literal: Record<string, string>
  onUserNameUpdate: (userName: string) => void
}

const UserNameInput: React.FC<UserNameInputProps> = ({
  literal,
  onUserNameUpdate,
}) => {
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUserNameUpdate(event.target.value)
  }

  return (
    <TextField
      fullWidth
      label={literal['user_name']}
      variant="standard"
      margin="normal"
      required
      onChange={handleUserNameChange}
    />
  )
}

export default UserNameInput
