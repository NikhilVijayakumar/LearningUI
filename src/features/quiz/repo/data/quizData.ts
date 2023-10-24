//path src/features/quiz/repo/data/quizData.ts

import { AppState } from '../../../../common/repo/AppState'
import { EventType } from '../../../../common/components/list/EventType'


export interface QueryInfo {
  chaptername: string
  question: Query
}

export type Quiz = QueryInfo[]



type ChapterResult = {
  chapterName: string;
  totalQuestions: number;
  correctAnswers: number;
};

export interface Query {
  correct_answer: string
  options: string[]
  question: string
}

//export type QuizTopic = Topic;

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
  validationError: boolean;
  quiz: Quiz;
  currentQuestionIndex: number;
  selectedAnswer: string;
  correctAnswers: number; 
  chapterResults: ChapterResult[];
  eventType: EventType;
}

export interface QuizViewProps {
  appstate: QuizState<Quiz>
  literal: Record<string, string>
  fetchQuiz: (quizdata: QuizTopic) => Promise<void>
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => void
  handleRestart: () => void
}
