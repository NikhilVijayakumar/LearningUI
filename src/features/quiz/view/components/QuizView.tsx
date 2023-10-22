//path src\features\quiz\view\components\QuizView.tsx

import { useState, useEffect, ChangeEvent } from 'react'
import { Box, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'
import { QuizViewProps, QuizTopic, Quiz } from '../../repo/data/quizData'
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
  //const [quiz, setQuiz] = useState<Quiz>([])
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  //const [selectedAnswer, setSelectedAnswer] = useState('')
  //const [correctAnswers, setCorrectAnswers] = useState(0)
  //const [quizCompleted, setQuizCompleted] = useState(false)

  const [renderedContent, setRenderedContent] = useState<JSX.Element | null>(
    null,
  )

  let quiz: Quiz = []
  let currentQuestionIndex = 0
  let selectedAnswer = ''
  let correctAnswers = 0
  let quizCompleted = false

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectedAnswer = (event.target as HTMLInputElement).value
  }

  const handleSubmit = () => {
    if (selectedAnswer === quiz[currentQuestionIndex].question.correct_answer) {
      correctAnswers = correctAnswers + 1
    }

    if (currentQuestionIndex < quiz.length - 1) {
      currentQuestionIndex = currentQuestionIndex + 1
      selectedAnswer = ''
      updateQuiz()
    } else {
      quizCompleted = true
      updateQuiz()
    }
  }

  const handleRestart = () => {
    currentQuestionIndex = 0
    selectedAnswer = ''
    correctAnswers = 0
    quizCompleted = false
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
        {quizCompleted ? (
          <div>
            <p>Quiz Completed</p>
            <p>Your score: {calculatePercentage()}%</p>
            <button onClick={handleRestart}>Restart Quiz</button>
          </div>
        ) : (
          <div>
            <p>{quiz[currentQuestionIndex].question.question}</p>
            <RadioGroup
              aria-labelledby="demo-error-radios"
              name="quiz"
              onChange={handleRadioChange}
            >
              {quiz[currentQuestionIndex].question.options.map((option, i) => (
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
    return ((correctAnswers / quiz.length) * 100).toFixed(2)
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
        quiz = quizData
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
