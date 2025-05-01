import { createStore } from '@/core/utils/StoreUtil';
import { getCacheDaily, getCacheMonthly, getCacheQuote, getCacheScores, setDaily, setMonthly, setQuote, setScores } from './actions/DailyAction';
import { IDailyState } from './interfaces/IDailyState';

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
    setQuote: setQuote(set, get),
    setScores: setScores(set, get),
    setMonthly: setMonthly(set, get),
    getCacheScores: getCacheScores(set, get),
    getCacheQuote: getCacheQuote(set, get),
    getCacheMonthly: getCacheMonthly(set, get),
    getCacheDaily: getCacheDaily(set, get),
  },
} as IDailyState);

const useDailyStore = createStore<IDailyState>(dailyStore);

export default useDailyStore;
