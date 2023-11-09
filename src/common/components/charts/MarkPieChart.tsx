import * as React from 'react'
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart'

interface MarkPieChartProps {
  wrightAnswer: number
  wrongAnswer: number
  wrightAnswerLabel: string
  wrongAnswerLabel: string
}

export const MarkPieChart: React.FC<MarkPieChartProps> = ({
  wrightAnswer,
  wrongAnswer,
  wrightAnswerLabel,
  wrongAnswerLabel,
}) => {
  const data = [
    { id: 0, value: wrightAnswer, label: wrightAnswerLabel },
    { id: 1, value: wrongAnswer, label: wrongAnswerLabel },
  ]

  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30 },
        },
      ]}
      sx={{
        [`& .${pieArcClasses.faded}`]: {
          fill: 'gray',
        },
      }}
      height={200}
    />
  )
}