import { createStore } from '@/core/utils/StoreUtil';
import {
  setAnswer,
  setLoadingAnswer,
  setQuestions,
  setTopic,
} from './actions/QuestionAction';
import { IQuestionState } from './interfaces/IQuestionState';
import { Topics } from '@/data';

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
    setAnswer: setAnswer(set, get),
    setloadingAnswer: setLoadingAnswer(set, get),
  },
} as IQuestionState);

const useQuestionStore = createStore<IQuestionState>(authStore);

export default useQuestionStore;
