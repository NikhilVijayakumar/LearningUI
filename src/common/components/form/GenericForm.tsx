import React, { ReactNode } from 'react'
import FormContainer from './FormContainer'
import FormHeader from './FormHeader'
import { TableColumn, TableDataItem } from '../table/tableData'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import { PaperProps } from '@mui/material/Paper'

interface GenericFormProps<T extends TableDataItem> {
  icon: ReactNode
  title: string
  headers: TableColumn[]
  data: T
  onSubmit: (formData: T) => void
  sx?: PaperProps['sx']
  children?: React.ReactNode
}

const GenericForm = <T extends TableDataItem>({
  icon,
  title,
  sx,
  children,
  headers,
  data,
  onSubmit,
}: GenericFormProps<T>) => {
  const [formdata, setFormData] = useState<T>(data)

  const setData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
  ) => {
    event.preventDefault()
    const value = event.target.value
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }))
    console.log(formdata)
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(formdata)
  }

  const generateFormInputs = (headers: TableColumn[]) => {
    return headers.map((header) => (
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          paddingBottom: '16px',
          marginBottom: '16px',
        }}
      >
        <TextField
          key={header.key}
          label={header.label}
          variant="standard"
          type="text"         
          name={header.key}
          value={formdata[header.key as keyof T] as unknown as string}
          onChange={(e) => setData(e, header.key)}
        />
      </Grid>
    ))
  }

  return (
    <FormContainer sx={sx}>
      <form onSubmit={handleFormSubmit}>
        <FormHeader icon={icon} title={title} />
        <Grid
          container
          justifyContent="start"
          alignItems="start"
          sx={{
            paddingBottom: '16px',
            marginLeft: '16px',
            marginBottom: '16px',
            marginTop: '16px',
            marginRight: '16px',
          }}
        >
          {generateFormInputs(headers)}
        </Grid>
        {children}
      </form>
    </FormContainer>
  )
}

export default GenericForm
