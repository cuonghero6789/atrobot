import { TopicsEnum } from '@/core/data';
import { TopicModel } from '@/core/types/atro';

export interface IQuestionState {
  loadingQuestion: boolean;
  loadingAnswer: boolean;
  questions?: string[];
  questionsMood?: string[];
  questionsLove?: string[];
  questionsCare?: string[];
  topics?: TopicModel[];
  topic?: TopicModel;
  answer?: string;

  actions: {
    setQuestions: (_questions: string[], type: TopicsEnum) => void;
    setTopic: (_topic: TopicModel) => void;
    setLoadingQuestion: (_loadingQuestion: boolean) => void;
    setAnswer: (_answer: string) => void;
    setloadingAnswer: (_loadingAnswer: boolean) => void;
  };
}
