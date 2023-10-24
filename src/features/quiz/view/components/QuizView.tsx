//path src\features\quiz\view\components\QuizView.tsx

import { useState, useEffect } from 'react'
import { Box, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'
import { QuizViewProps, QuizTopic} from '../../repo/data/quizData'
import { StateType } from '../../../../common/repo/AppState'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { EventType } from '../../../../common/components/list/EventType'

export default function QuizView({
  appstate,
  literal,
  fetchQuiz,
  handleRadioChange,
  handleRestart,
  handleSubmit,
}: QuizViewProps) {

  const [renderedContent, setRenderedContent] = useState<JSX.Element | null>(
    null,
  )  

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
        {appstate.validationError ? (
        <Box>
          <Alert severity="error">Please select an option</Alert>
        </Box>):null}

        {appstate.eventType == EventType.COMPLETED ? (
          <div>
            <p>Quiz Completed</p>
            <p>Your score: {calculatePercentage()}%</p>
            <button onClick={handleRestart}>Restart Quiz</button>
          </div>
        ) : (
          <div>
            <p>{appstate.quiz[appstate.currentQuestionIndex].question.question}</p>
            <RadioGroup
              aria-labelledby="radio-group-question"
              name="quiz"
              onChange={handleRadioChange}
            >
              {appstate.quiz[appstate.currentQuestionIndex].question.options.map((option, i) => (
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
    return ((appstate.correctAnswers / appstate.quiz.length) * 100).toFixed(2)
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
      if (appstate.state == StateType.INIT) {
        fetchQuiz(topic)
      } else if (appstate.state == StateType.LOADING) {
        setRenderedContent(<CircularProgress />)
      } else if (
        appstate.state == StateType.COMPLETED &&
        appstate.isSuccess && appstate.quiz.length == 0       
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
        appstate.eventType == EventType.NEXT
      ) {      
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
      appstate.eventType,
      appstate.currentQuestionIndex,
      appstate.validationError,
      appstate.correctAnswers,
      appstate.quiz,      
    ])
  }
  return <>{renderedContent}</>
}
