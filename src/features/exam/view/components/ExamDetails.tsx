
//path src\features\organization\view\components\OrganizarionList.tsx
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ExamDetails({
  
}) {
  const { name, types } = useParams();
  const typesArray = types?.split(',') || [];

  const [type, setType] = useState(typesArray[0] || '');

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // send the state to exam.php or any other logic
    // console.log({topic, type, mode});
    // fetchQuiz(topic, type, mode); // call the fetchQuiz function with the selected topic, type, and mode
  };

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
      Skill Sage 
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FormControl sx={{ margin: '10px' }} component="fieldset">
            <FormLabel component="legend">{name}</FormLabel>
          </FormControl>
          <FormControl sx={{ margin: '10px' }} component="fieldset">
            <FormLabel component="legend">Select an exam type:</FormLabel>
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
          <Button type="submit" variant="contained" sx={{ width: '200px', height: '50px', margin: '10px' }}>
            Start Exam
          </Button>
        </Box>
      </form>
    </Box>
  );
}


