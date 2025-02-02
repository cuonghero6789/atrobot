import {TopicModel} from '../../models/ItemModel';
import {TopicsEnum} from '../../screens/data';

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
    setAnswer: (_answer: string) => void;
    setloadingAnswer: (_loadingAnswer: boolean) => void;
  };
}
