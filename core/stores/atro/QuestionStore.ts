import { createStore } from '@/core';
import {
  setAnswer,
  setLoadingAnswer,
  setLoadingQuestion,
  setQuestions,
  setTopic,
} from '@/core/stores/actions/atro/QuestionAction';
import { IQuestionState } from '@/core/stores/interfaces/atro/IQuestionState';
import { Topics } from '@/core/data';

const initState: Omit<IQuestionState, 'actions'> = {
  loadingQuestion: true,
  loadingAnswer: true,
  questions: [],
  questionsCare: [],
  questionsLove: [],
  questionsMood: [],
  topics: Topics,
  topic: Topics[0],
};

const authStore = (set: any, get: any) =>
({
  ...initState,
  actions: {
    setQuestions: setQuestions(set, get),
    setTopic: setTopic(set, get),
    setLoadingQuestion: setLoadingQuestion(set, get),
    setAnswer: setAnswer(set, get),
    setloadingAnswer: setLoadingAnswer(set, get),
  },
} as IQuestionState);

const useQuestionStore = createStore<IQuestionState>(authStore);

export default useQuestionStore;
