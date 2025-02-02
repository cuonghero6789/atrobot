import AsyncStorage from '@react-native-async-storage/async-storage';
import {DailyModel, ScoreModel} from '../../models/ItemModel';
import {IDailyState} from '../interfaces/IDailyState';
export const setScores =
  (set: any, get: any) => async (_scores: ScoreModel[], from_date: string) => {
    const {scores} = get();
    const formatScore = {...scores, [from_date]: _scores};
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
export const setDaily =
  (set: any, get: any) => async (_daily: DailyModel[], from_date: string) => {
    const {dailys} = get();
    const formatdailys = {...dailys, [from_date]: _daily};
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
export const setEvents =
  (set: any, get: any) => async (_events: string[], from_date: string) => {
    const {events} = get();
    const formatEvent = {...events, [from_date]: _events};
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
export const setQuote =
  (set: any, get: any) => async (_quote: string, from_date: string) => {
    try {
      set(
        (state: IDailyState) => {
          state.quotes[from_date] = _quote;
        },
        false,
        'setQuoteSuccess',
      );
    } catch (error: any) {
      console.log('Login error:', error.message);
    }
  };
