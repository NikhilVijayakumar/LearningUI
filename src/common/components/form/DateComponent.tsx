//path src/common/components/form/DateComponent.tsx

import React from 'react'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateComponentProps, Date } from './formData'

const DateComponent: React.FC<DateComponentProps> = ({
  label,
  date,
  onDateUpdate,
}) => {
  const [value, setValue] = React.useState<Date>(dayjs(date))

  const onDateChange = (newDate: Date) => {
    if (newDate === null) {
      return
    }
    setValue(newDate)
    onDateUpdate(newDate)
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label={label} value={value} onChange={onDateChange} />
    </LocalizationProvider>
  )
}

export default DateComponent
