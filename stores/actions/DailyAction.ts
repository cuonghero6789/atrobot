import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailyModel, ScoreModel } from '../../models/ItemModel';
import { IDailyState } from '../interfaces/IDailyState';

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
    const value = await AsyncStorage.getItem('dailys');
    if (value) {
      const dailys = JSON.parse(value);
      set(
        (state: IDailyState) => {
          state.dailys = dailys;
        },
        false,
        'getCacheDailySuccess',
      );
    }
  } catch (error: any) {
    console.log('getCacheDaily error:', error.message);
  }
};

export const setDaily =
  (set: any, get: any) => async (_daily: DailyModel[], from_date: string) => {
    const { dailys } = get();
    const formatdailys = { ...dailys, [from_date]: _daily };
    AsyncStorage.setItem('dailys', JSON.stringify(formatdailys));
    try {
      set(
        (state: IDailyState) => {
          state.dailys = formatdailys;
        },
        false,
        'setDailySuccess',
      );
    } catch (error: any) {
      console.log('Login error:', error.message);
    }
  };

export const getCacheEvents = (set: any, get: any) => async () => {
  try {
    const value = await AsyncStorage.getItem('events');
    if (value) {
      const events = JSON.parse(value);
      set(
        (state: IDailyState) => {
          state.events = events;
        },
        false,
        'getCacheEventsSuccess',
      );
    }
  } catch (error: any) {
    console.log('getCacheEvents error:', error.message);
  }
};

export const setEvents =
  (set: any, get: any) => async (_events: string[], from_date: string) => {
    const { events } = get();
    const formatEvent = { ...events, [from_date]: _events };
    AsyncStorage.setItem('events', JSON.stringify(formatEvent));
    try {
      set(
        (state: IDailyState) => {
          state.events = formatEvent;
        },
        false,
        'setEventsSuccess',
      );
    } catch (error: any) {
      console.log('Events error:', error.message);
    }
  };

export const getCacheQuote = (set: any, get: any) => async () => {
  try {
    const value = await AsyncStorage.getItem('quotes');
    if (value) {
      const quotes = JSON.parse(value);
      set(
        (state: IDailyState) => {
          state.quotes = quotes;
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
  (set: any, get: any) => async (_quote: string, from_date: string) => {
    const { quotes } = get();
    const formatQuote = { ...quotes, [from_date]: _quote };
    AsyncStorage.setItem('quotes', JSON.stringify(formatQuote));
    try {
      set(
        (state: IDailyState) => {
          state.quotes = formatQuote;
        },
        false,
        'setQuoteSuccess',
      );
    } catch (error: any) {
      console.log('Login error:', error.message);
    }
  };
