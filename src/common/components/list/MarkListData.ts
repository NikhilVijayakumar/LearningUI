//path src/common/components/list/MarkData.ts
export type MarkResult = {
  chapterName: string
  totalQuestions: number
  correctAnswers: number
}

export interface MarksListProps {
  data: MarkResult[]
}
