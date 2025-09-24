import { createStore } from '@/core';
import { getListUserHistory, setStarMate, setUser, setUserToHistory, setIsLoading, removeUserFromHistory } from '@/core/stores/actions/atro/StarMatesAction';
import IStarMatesState from '@/core/stores/interfaces/atro/IStarMatesState';

const initState: Omit<IStarMatesState, 'actions'> = {
    isLoading: true,
    starMate: undefined,
    user: undefined,
    listUserHistory: []
};

const starMatesStore = (set: any, get: any) =>
({
    ...initState,
    actions: {
        setStarMate: setStarMate(set, get),
        setUser: setUser(set, get),
        setUserToHistory: setUserToHistory(set, get),
        getListUserHistory: getListUserHistory(set, get),
        setIsLoading: setIsLoading(set, get),
        removeUserFromHistory: removeUserFromHistory(set, get)
    },
} as IStarMatesState);

const useStarMatesStore = createStore<IStarMatesState>(starMatesStore);

export default useStarMatesStore; 