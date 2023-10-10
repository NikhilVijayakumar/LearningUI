//path src/common/components/form/FormContainer.tsx

import React from 'react'
import Paper, { PaperProps } from '@mui/material/Paper'

interface FormContainerProps {
  sx?: PaperProps['sx']
  children: React.ReactNode
}

const FormContainer: React.FC<FormContainerProps> = ({ sx, children }) => {
  return (
    <Paper elevation={3} sx={sx}>
      {children}
    </Paper>
  )
}

export default FormContainer
