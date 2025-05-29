import { createStore } from '@/core';
import { getCacheDaily, getCacheMonthly, getCacheQuote, getCacheScores, setDaily, setMonthly, setQuote, setScores } from '../actions/atro/DailyAction';
import { IDailyState } from '../interfaces/atro/IDailyState';

const initState: Omit<IDailyState, 'actions'> = {
  loading: true,
  weekly: {},
  monthly: {},
  quote: '',
  scores: {},
};

const dailyStore = (set: any, get: any) =>
({
  ...initState,
  actions: {
    setDaily: setDaily(set, get),
    setMonthly: setMonthly(set, get),
    setQuote: setQuote(set, get),
    setScores: setScores(set, get),
    getCacheScores: getCacheScores(set, get),
    getCacheQuote: getCacheQuote(set, get),
    getCacheMonthly: getCacheMonthly(set, get),
    getCacheDaily: getCacheDaily(set, get),
  },
} as IDailyState);

const useDailyStore = createStore<IDailyState>(dailyStore);

export default useDailyStore; 