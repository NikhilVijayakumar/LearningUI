//path src\features\quiz\view\components\QuizView.tsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Paper,
} from '@mui/material';
import { useParams } from 'react-router-dom';

export default function QuizView()  {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const { name, type } = useParams();
  console.log('name', name);
  console.log('type', type);
  return <>
  Quiz View
  </>

  // useEffect(() => {
  //   // Simulate fetching quiz questions from an API
  //   // Replace this with your actual API request
  //   const fetchQuizQuestions = async () => {
  //     try {
  //       const response = await fetch('API_ENDPOINT_HERE');
  //       const data = await response.json();
  //       setQuestions(data.data['Chapter 1']); // Load questions from a specific chapter
  //     } catch (error) {
  //       console.error('Error fetching quiz questions:', error);
  //     }
  //   };

  //   fetchQuizQuestions();
  // }, []);

  // const handleAnswerChange = (event) => {
  //   setSelectedAnswer(event.target.value);
  // };

  // const handleSubmit = () => {
  //   if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
  //     setCorrectAnswers(correctAnswers + 1);
  //   }

  //   if (currentQuestionIndex < questions.length - 1) {
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //     setSelectedAnswer('');
  //   } else {
  //     setQuizCompleted(true);
  //   }
  // };

  // const handleRestart = () => {
  //   setCurrentQuestionIndex(0);
  //   setSelectedAnswer('');
  //   setCorrectAnswers(0);
  //   setQuizCompleted(false);
  // };

  // const calculatePercentage = () => {
  //   return ((correctAnswers / questions.length) * 100).toFixed(2);
  // };

  // return (
  //   <Box
  //     sx={{
  //       width: '800px',
  //       margin: '0 auto',
  //       padding: '20px',
  //       backgroundColor: 'white',
  //       boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  //     }}
  //   >
  //     <Typography variant="h4" align="center" sx={{ color: '#333333' }}>
  //       Quiz Question
  //     </Typography>
  //     {quizCompleted ? (
  //       <Paper elevation={3} sx={{ padding: '16px', margin: '16px 0' }}>
  //         <Typography variant="h6" color="primary">
  //           Quiz Completed
  //         </Typography>
  //         <Typography variant="body1" sx={{ marginTop: '16px' }}>
  //           You answered {correctAnswers} out of {questions.length} questions correctly.
  //         </Typography>
  //         <Typography variant="body1" sx={{ marginTop: '8px' }}>
  //           Your score: {calculatePercentage()}%
  //         </Typography>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={handleRestart}
  //           sx={{ marginTop: '16px' }}
  //         >
  //           Restart Quiz
  //         </Button>
  //       </Paper>
  //     ) : (
  //       <Paper elevation={3} sx={{ padding: '16px', margin: '16px 0' }}>
  //         <Typography variant="h6" color="primary">
  //           {questions[currentQuestionIndex].question}
  //         </Typography>
  //         <FormControl component="fieldset">
  //           <FormLabel component="legend">Select an answer:</FormLabel>
  //           <RadioGroup
  //             aria-label="answer"
  //             name="answer"
  //             value={selectedAnswer}
  //             onChange={handleAnswerChange}
  //           >
  //             {questions[currentQuestionIndex].options.map((option, index) => (
  //               <FormControlLabel
  //                 key={index}
  //                 value={option}
  //                 control={<Radio />}
  //                 label={option}
  //               />
  //             ))}
  //           </RadioGroup>
  //         </FormControl>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={handleSubmit}
  //           sx={{ marginTop: '16px' }}
  //         >
  //           Next Question
  //         </Button>
  //       </Paper>
  //     )}
  //   </Box>
  // );
};


