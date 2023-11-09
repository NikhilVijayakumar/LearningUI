import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart'
import { MarkResult } from '../list/MarkListData'

interface MarkLineChartProps {
  results: MarkResult[]
  passThreshold: number
}

export const MarkLineChart: React.FC<MarkLineChartProps> = ({
  results,
  passThreshold,
}) => {
  const xdata = results.map((result, index) => index + 1+result.totalQuestions-result.totalQuestions) 
  const passData = new Array(results.length).fill(passThreshold)
  const markData = results.map(
    (result) => (result.correctAnswers / result.totalQuestions) * 100,
  )

  return (
    <LineChart
      xAxis={[{ data: xdata }]}
      series={[
        { curve: 'linear', data: passData },
        { curve: 'linear', data: markData },
      ]}
      width={500}
      height={300}
    />
  )
}