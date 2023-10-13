//path src/features/organization/repo/data/organizationData.ts
import { AppState } from '../../../../common/repo/AppState'
import {Topic} from '../../../topic/repo/data/topicData'


export interface QuestionOption {
  correct_answer: string;
  options: string[];
  question: string;
}

export type QuizTopic = Topic;

export interface Quiz{
  [chapterName: string]: QuestionOption[];
}

// Define the root data structure
export interface QuizResponse {
  data: {
    quiz:Quiz
  };
  status: string;
}

export interface ExamState<Quiz>
  extends AppState<Quiz> {
   
}

export interface ExamDetailsProps {
  appstate: ExamState<Quiz>
  literal: Record<string, string>
  fetchQuiz: (quizdata: QuizTopic) => Promise<void>
}
