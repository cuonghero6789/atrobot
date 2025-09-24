import { createStore } from '@/core';
import ILuckyDayState from '../interfaces/atro/ILuckyDayState';
import { setIsLoading, setWeek, setMonth } from '../actions/atro/LuckyDayAction';

const initState: Omit<ILuckyDayState, 'actions'> = {
    isLoading: true,
    week: undefined,
    month: undefined,
};

const luckyDayStore = (set: any, get: any) =>
({
    ...initState,
    actions: {
        setIsLoading: setIsLoading(set, get),
        setWeek: setWeek(set, get),
        setMonth: setMonth(set, get),
    },
} as ILuckyDayState);

const useLuckyDayStore = createStore<ILuckyDayState>(luckyDayStore);

export default useLuckyDayStore; 