//path src\features\quiz\view\components\QuizView.tsx

import { useState, useEffect } from 'react'
import { Box, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'
import { QuizViewProps, QuizTopic, Quiz,QuizInfo } from '../../repo/data/quizData'
import { StateType } from '../../../../common/repo/AppState'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function QuizView({
  appstate,
  literal,
  fetchQuiz,
}: QuizViewProps) {

  const [renderedContent, setRenderedContent] = useState<JSX.Element | null>(
    null,
  )

  const info: QuizInfo = {
    quiz: [], 
    currentQuestionIndex: 0, 
    selectedAnswer: '', 
    correctAnswers: 0, 
    quizCompleted: false, 
    chapterResults: [], 
    validationError:false
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    info.selectedAnswer = (event.target as HTMLInputElement).value
  }

  const handleSubmit = () => {
    if (info.selectedAnswer === '') {
      info.validationError = true
      updateQuiz()
      return
    }
    info.validationError = false
    if (info.selectedAnswer === info.quiz[info.currentQuestionIndex].question.correct_answer) {
      info.correctAnswers = info.correctAnswers + 1
    }

    if (info.currentQuestionIndex < info.quiz.length - 1) {
      info.currentQuestionIndex = info.currentQuestionIndex + 1
      info.selectedAnswer = ''
      updateQuiz()
    } else {
      info.quizCompleted = true
      updateQuiz()
    }
  }

  const handleRestart = () => {
    info.currentQuestionIndex = 0
    info.selectedAnswer = ''
    info.correctAnswers = 0
    info.quizCompleted = false
    updateQuiz()
  }

  const updateQuiz = () => {
    setRenderedContent(
      <Box
        sx={{
          width: '800px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {info.validationError ? (
        <Box>
          <Alert severity="error">Please select an option</Alert>
        </Box>):null}

        {info.quizCompleted ? (
          <div>
            <p>Quiz Completed</p>
            <p>Your score: {calculatePercentage()}%</p>
            <button onClick={handleRestart}>Restart Quiz</button>
          </div>
        ) : (
          <div>
            <p>{info.quiz[info.currentQuestionIndex].question.question}</p>
            <RadioGroup
              aria-labelledby="radio-group-question"
              name="quiz"
              onChange={handleRadioChange}
            >
              {info.quiz[info.currentQuestionIndex].question.options.map((option, i) => (
                <FormControlLabel
                  key={i}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
            <button onClick={handleSubmit}>Next Question</button>
          </div>
        )}
      </Box>,
    )
  }

  const calculatePercentage = () => {
    return ((info.correctAnswers / info.quiz.length) * 100).toFixed(2)
  }

  const { name, type } = useParams()

  if (name == null || type == null) {
    setRenderedContent(
      <Paper>
        <Alert severity="error">Something went wrong</Alert>
      </Paper>,
    )
  } else {
    const topic: QuizTopic = {
      name,
      type,
    }
    useEffect(() => {
      let quizData = appstate.data
      if (appstate.state == StateType.INIT) {
        fetchQuiz(topic)
      } else if (appstate.state == StateType.LOADING) {
        setRenderedContent(<CircularProgress />)
      } else if (
        appstate.state == StateType.COMPLETED &&
        appstate.isSuccess &&
        quizData == null
      ) {
        setRenderedContent(
          <Paper>
            <Alert severity="warning">No List found</Alert>
          </Paper>,
        )
      }
      if (appstate.isError) {
        setRenderedContent(
          <Paper>
            <Alert severity="error">{appstate.statusMessage}</Alert>
          </Paper>,
        )
      } else if (
        appstate.isSuccess &&
        appstate.state == StateType.COMPLETED &&
        quizData != null
      ) {
        info.quiz = quizData
        updateQuiz()
      } else {
        setRenderedContent(
          <Paper>
            <Alert severity="error">Something went wrong</Alert>
          </Paper>,
        )
      }
    }, [
      appstate.state,
      appstate.data,
      appstate.isError,
      appstate.statusMessage,
    ])
  }
  return <>{renderedContent}</>
}
