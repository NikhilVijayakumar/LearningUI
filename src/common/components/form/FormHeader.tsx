//path src/common/components/form/FormHeader.tsx
import React, { ReactNode } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

interface FormHeaderProps {
  icon: ReactNode
  title: string
}

const FormHeader: React.FC<FormHeaderProps> = ({ icon, title }) => {
  return (
    <Grid container spacing={0.15} alignItems="center" justifyContent="center">
      <Grid item>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>{icon}</Avatar>
      </Grid>
      <Grid item>
        <Typography component="h1" variant="h4">
          {title.toUpperCase()}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default FormHeader
