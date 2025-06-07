import { TopicsEnum } from '@/core/data';
import { TopicModel } from '@/core/types/atro';

export const setQuestions =
  (set: any, get: any) => async (_questions: string[], type: TopicsEnum) => {
    try {
      set(
        (state: any) => {
          if (type === TopicsEnum.Love) {
            state.questionsLove = _questions;
          }
          if (type === TopicsEnum.Mood) {
            state.questionsMood = _questions;
          }
          if (type === TopicsEnum.Work) {
            state.questionsCare = _questions;
          }
          if (type === TopicsEnum.Self) {
            state.questions = _questions;
          }
          state.questions = _questions;
          state.loadingQuestion = false;
        },
        false,
        'setQuestionsSuccess',
      );
    } catch (error: any) {
      console.log('Login error:', error.message);
    }
  };

export const setTopic = (set: any, get: any) => async (_topic: TopicModel) => {
  try {
    set(
      (state: any) => {
        state.topic = _topic;
        state.loadingQuestion = true;
      },
      false,
      'setTopicSuccess',
    );
  } catch (error: any) {
    console.log('Login error:', error.message);
  }
};

export const setLoadingQuestion = (set: any, get: any) => async (_loadingQuestion: boolean) => {
  try {
    set(
      (state: any) => {
        state.loadingQuestion = _loadingQuestion;
      },
      false,
      'setLoadingQuestionSuccess',
    );
  } catch (error: any) {
    console.log('setLoadingQuestion error:', error.message);
  }
};

export const setLoadingAnswer =
  (set: any, get: any) => async (_loadingAnswer: boolean) => {
    try {
      set(
        (state: any) => {
          state.loadingAnswer = _loadingAnswer;
        },
        false,
        'setLoadingAnswerSuccess',
      );
    } catch (error: any) {
      console.log('Login error:', error.message);
    }
  };

export const setAnswer = (set: any, get: any) => async (_answer: string) => {
  try {
    set(
      (state: any) => {
        state.answer = _answer;
        state.loadingAnswer = false;
      },
      false,
      'setAnswerSuccess',
    );
  } catch (error: any) {
    console.log('Login error:', error.message);
  }
};
