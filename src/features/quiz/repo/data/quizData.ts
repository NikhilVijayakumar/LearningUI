//path src/features/quiz/repo/data/quizData.ts

import { AppState } from '../../../../common/utils/AppState'
import { EventType } from '../../../../common/utils/EventType'
import { MarkResult } from '../../../../common/components/list/MarkListData'

export interface QueryInfo {
  chaptername: string
  question: Query
}

export interface Query {
  correct_answer: string
  options: string[]
  question: string
}

export type Quiz = QueryInfo[]
export type ChapterResult = MarkResult

export interface QuizTopic {
  name: string
  type: string
}

export interface QuizRequest {
  topic: string
  type: string
}

// Define the root data structure
export interface QuizResponse {
  data: Quiz
  status: string
}

export interface QuizState<Quiz> extends AppState<Quiz> {
  validationError: boolean
  quiz: Quiz
  currentQuestionIndex: number
  selectedAnswer: string
  correctAnswers: number
  chapterResults: ChapterResult[]
  eventType: EventType
}

export interface QuizViewProps {
  appstate: QuizState<Quiz>
  literal: Record<string, string>
  fetchQuiz: (quizdata: QuizTopic) => Promise<void>
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => void
  handleRestart: () => void
}
