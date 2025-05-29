import AsyncStorage from '@react-native-async-storage/async-storage';
import { AtroDailyModel, AtroDailyMonthlyModel, ScoreModel } from '@/core/types/atro';
import { IDailyState } from '../../interfaces/atro/IDailyState';

export const getCacheScores = (set: any, get: any) => async () => {
  try {
    const value = await AsyncStorage.getItem('scores');
    if (value) {
      const scores = JSON.parse(value);
      set(
        (state: IDailyState) => {
          state.scores = scores;
        },
        false,
        'getCacheScoresSuccess',
      );
    }
  } catch (error: any) {
    console.log('getCacheScores error:', error.message);
  }
};

export const setScores =
  (set: any, get: any) => async (_scores: ScoreModel[], from_date: string) => {
    const { scores } = get();
    const formatScore = { ...scores, [from_date]: _scores };
    AsyncStorage.setItem('scores', JSON.stringify(formatScore));
    try {
      set(
        (state: IDailyState) => {
          state.scores = formatScore;
        },
        false,
        'setScoresSuccess',
      );
    } catch (error: any) {
      console.log('Login error:', error.message);
    }
  };

export const getCacheDaily = (set: any, get: any) => async () => {
  try {
    const value = await AsyncStorage.getItem('weekly');
    if (value) {
      const weekly = JSON.parse(value);
      set(
        (state: IDailyState) => {
          state.weekly = weekly;
        },
        false,
        'getCacheDailySuccess',
      );
    }
  } catch (error: any) {
    console.log('getCacheDaily error:', error.message);
  }
};

export const setMonthly =
  (set: any, get: any) => async (monthly: AtroDailyMonthlyModel) => {
    AsyncStorage.setItem('monthly', JSON.stringify(monthly));
    try {
      set(
        (state: IDailyState) => {
          state.monthly = monthly;
        },
        false,
        'setMonthlySuccess',
      );
    } catch (error: any) {
      console.log('setMonthly error:', error.message);
    }
  };

export const setDaily =
  (set: any, get: any) => async (weekly: AtroDailyModel) => {
    AsyncStorage.setItem('weekly', JSON.stringify(weekly));
    try {
      set(
        (state: IDailyState) => {
          state.weekly = weekly;
        },
        false,
        'setDailySuccess',
      );
    } catch (error: any) {
      console.log('setDaily error:', error.message);
    }
  };

export const getCacheMonthly = (set: any, get: any) => async () => {
  try {
    const value = await AsyncStorage.getItem('monthly');
    if (value) {
      const monthly = JSON.parse(value);
      set(
        (state: IDailyState) => {
          state.monthly = monthly;
        },
        false,
        'getCacheMonthlySuccess',
      );
    }
  } catch (error: any) {
    console.log('getCacheMonthly error:', error.message);
  }
};

export const getCacheQuote = (set: any, get: any) => async () => {
  try {
    const value = await AsyncStorage.getItem('quote');
    if (value) {
      const quote = JSON.parse(value);
      set(
        (state: IDailyState) => {
          state.quote = quote;
        },
        false,
        'getCacheQuoteSuccess',
      );
    }
  } catch (error: any) {
    console.log('getCacheQuote error:', error.message);
  }
};

export const setQuote =
  (set: any, get: any) => async (quote: string) => {
    AsyncStorage.setItem('quote', JSON.stringify(quote));
    try {
      set(
        (state: IDailyState) => {
          state.quote = quote;
        },
        false,
        'setQuoteSuccess',
      );
    } catch (error: any) {
      console.log('setQuote error:', error.message);
    }
  };
