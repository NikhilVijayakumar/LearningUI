import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ExamDetailsProps } from '../../repo/data/examData'
import { useNavigate } from 'react-router-dom'
import { UrlList } from '../../../../common/routes/UrlList'
import examIcon from '../../../../assets/exam_icon.png'
import FormFooter from '../../../../common/components/form/FormFooter'

export default function ExamDetails({ literal }: ExamDetailsProps) {
  const { name, types } = useParams()
  const typesArray = types?.split(',') || []

  const [type, setType] = useState(typesArray[0] || '')

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value)
  }
  const navigate = useNavigate()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(`${UrlList.QUIZ}/${name}/${type}`)
  }

  return (
    <Box
      sx={{
        width: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h4" align="center" sx={{ color: '#333333' }}>
        <img src={examIcon} alt="Exam Icon" width="96" height="96" />
        {literal['app_name']}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FormControl sx={{ margin: '10px' }} component="fieldset">
            <FormLabel component="legend">{name}</FormLabel>
          </FormControl>
          <FormControl sx={{ margin: '10px' }} component="fieldset">
            <FormLabel component="legend">
              {' '}
              {literal['select_exam_type']}
            </FormLabel>
            <RadioGroup
              row
              aria-label="type"
              name="type"
              value={type}
              onChange={handleTypeChange}
            >
              {typesArray.map((typeOption) => (
                <FormControlLabel
                  key={typeOption}
                  value={typeOption}
                  control={<Radio />}
                  label={typeOption}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: '200px', height: '50px', margin: '10px' }}
          >
            {literal['start_exam']}
          </Button>
        </Box>
        <FormFooter />
      </form>
    </Box>
  )
}
