//path src\features\quiz\view\components\QuizView.tsx

import { useState, useEffect } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { QuizViewProps, QuizTopic } from '../../repo/data/quizData'
import { StateType } from '../../../../common/utils/AppState'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { EventType } from '../../../../common/utils/EventType'
import quizIcon from '../../../../assets/quiz_icon.png'
import resultIcon from '../../../../assets/result_icon.png'
import { shuffleArray } from '../../../../common/utils/arrayUtils'
import { MarksList } from '../../../../common/components/list/MarkList'
import { MarkPieChart } from '../../../../common/components/charts/MarkPieChart'
import { MarkLineChart } from '../../../../common/components/charts/MarkLineChart'
import LegendToggleIcon from '@mui/icons-material/LegendToggle'
import AssignmentIcon from '@mui/icons-material/Assignment'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import IconButton from '@mui/material/IconButton'
import FormFooter from '../../../../common/components/form/FormFooter'

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
  let viewMode = false

  const examResult = () => {
    return (
      <>
        <IconButton onClick={toggleViewMode} color="secondary">
          {viewMode ? <AssignmentIcon /> : <LegendToggleIcon />}
        </IconButton>
        <IconButton onClick={handleRestart} color="secondary">
          {<RestartAltIcon />}
        </IconButton>
        {viewMode ? examGraphicsResult() : examTextResult()}
      </>
    )
  }

  const examGraphicsResult = () => {
    const wrongAnswer = appstate.quiz.length - appstate.correctAnswers
    return (
      <div>
        <Typography variant="h3" align="center" sx={{ color: '#333333' }}>
          <img src={resultIcon} alt="Exam Icon" width="96" height="96" />
          {literal['result']}
        </Typography>
        <MarkPieChart
          wrightAnswer={appstate.correctAnswers}
          wrongAnswer={wrongAnswer}
          wrightAnswerLabel="Wright Answer"
          wrongAnswerLabel="Wrong Answer"
        />

        <Typography variant="h3" align="center" sx={{ color: '#333333' }}>
          Chapterwise Marks
        </Typography>
        <MarkLineChart results={appstate.chapterResults} passThreshold={70} />
      </div>
    )
  }

  const examTextResult = () => {
    return (
      <Box>
        <div>
          <Typography variant="h3" align="center" sx={{ color: '#333333' }}>
            <img src={resultIcon} alt="Exam Icon" width="96" height="96" />
            {literal['result']}
          </Typography>
          <Typography variant="h4" align="center" sx={{ color: '#333333' }}>
            {literal['score']} {appstate.correctAnswers} /{' '}
            {appstate.quiz.length} = {calculatePercentage()} %
          </Typography>
        </div>
        <MarksList data={appstate.chapterResults} />
      </Box>
    )
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
        {appstate.validationError ? (
          <Box>
            <Alert severity="error">{literal['option_error']}</Alert>
          </Box>
        ) : null}
        {appstate.eventType == EventType.COMPLETED ? (
          examResult()
        ) : (
          <div>
            <Typography variant="h2" align="center" sx={{ color: '#333333' }}>
              <img src={quizIcon} alt="Quiz Icon" width="96" height="96" />
              {literal['quiz']}
            </Typography>
            <Typography variant="h4" align="center" sx={{ color: '#333333' }}>
              {appstate.currentQuestionIndex + 1} .{' '}
              {appstate.quiz[appstate.currentQuestionIndex].question.question}
            </Typography>

            <RadioGroup
              aria-labelledby="radio-group-question"
              name="quiz"
              onChange={handleRadioChange}
            >
              {getOptions().map((option, i) => (
                <FormControlLabel
                  key={i}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
            <button onClick={handleSubmit}>{literal['next_question']}</button>
          </div>
        )}
      </Box>,
    )
  }

  const toggleViewMode = () => {
    viewMode = !viewMode
    console.log('toggleViewMode', viewMode)
    updateQuiz()
  }

  const getOptions = () => {
    return shuffleArray(
      appstate.quiz[appstate.currentQuestionIndex].question.options,
    )
  }

  const calculatePercentage = () => {
    return ((appstate.correctAnswers / appstate.quiz.length) * 100).toFixed(2)
  }

  const { name, type } = useParams()

  if (name == null || type == null) {
    setRenderedContent(
      <Paper>
        <Alert severity="error">{literal['internal_error']}</Alert>
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
        appstate.isSuccess &&
        appstate.quiz.length == 0
      ) {
        setRenderedContent(
          <Paper>
            <Alert severity="warning">{literal['no_questions']}</Alert>
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
        appstate.eventType == EventType.NEXT ||
        appstate.eventType == EventType.COMPLETED
      ) {
        updateQuiz()
      } else {
        setRenderedContent(
          <Paper>
            <Alert severity="error">{literal['internal_error']}</Alert>
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
  return (
    <>
      {renderedContent}
      <FormFooter />
    </>
  )
}
