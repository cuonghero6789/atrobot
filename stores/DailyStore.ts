import { createStore } from '@/core/utils/StoreUtil';
import { getCacheDaily, getCacheEvents, getCacheQuote, getCacheScores, setDaily, setEvents, setQuote, setScores } from './actions/DailyAction';
import { IDailyState } from './interfaces/IDailyState';

const initState: Omit<IDailyState, 'actions'> = {
  loading: true,
  dailys: {},
  quotes: {},
  events: {},
  scores: {},
};

const dailyStore = (set: any, get: any) =>
({
  ...initState,
  actions: {
    setDaily: setDaily(set, get),
    setQuote: setQuote(set, get),
    setScores: setScores(set, get),
    setEvents: setEvents(set, get),
    getCacheScores: getCacheScores(set, get),
    getCacheQuote: getCacheQuote(set, get),
    getCacheEvents: getCacheEvents(set, get),
    getCacheDaily: getCacheDaily(set, get),
  },
} as IDailyState);

const useDailyStore = createStore<IDailyState>(dailyStore);

export default useDailyStore;
