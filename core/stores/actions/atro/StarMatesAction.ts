import { StarMateModel } from "@/core/types/atro";
import IStarMatesState from "../../interfaces/atro/IStarMatesState";
import { UserModel } from "@/core/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const STAR_MATES_HISTORY_KEY = 'STAR_MATES_HISTORY';

export const setIsLoading = (set: any, get: any) => async (loading: boolean) => {
    try {
        set(
            (state: IStarMatesState) => {
                state.isLoading = loading;
            },
            false,
            'setLoadingSuccess',
        );
    } catch (error: any) {
        console.log('setLoading error:', error.message);
    }
};

export const setStarMate = (set: any, get: any) => async (starMate: StarMateModel) => {
    try {
        set(
            (state: IStarMatesState) => {
                state.starMate = starMate;
                state.isLoading = false;
            },
            false,
            'setStarMateSuccess',
        );
    } catch (error: any) {
        console.log('setStarMate error:', error.message);
    }
};

export const setUserToHistory = (set: any, get: any) => async (user: UserModel) => {
    try {
        const cached = await AsyncStorage.getItem(STAR_MATES_HISTORY_KEY);
        const current: UserModel[] = cached ? JSON.parse(cached) : [];

        const normalize = (s?: string) => (s || '').trim().toLowerCase();
        const getNameKey = (u: UserModel) => normalize(u.display_name || u.user_name);

        const nameKey = getNameKey(user);
        let next: UserModel[] = [];
        if (nameKey) {
            const idx = current.findIndex((u) => getNameKey(u) === nameKey);
            if (idx >= 0) {
                next = [...current.slice(0, idx), user, ...current.slice(idx + 1)];
            } else {
                next = [...current, user];
            }
        } else {
            // Fallback if no name available – append to history
            next = [...current, user];
        }
        await AsyncStorage.setItem(STAR_MATES_HISTORY_KEY, JSON.stringify(next));

        set(
            (state: IStarMatesState) => {
                state.listUserHistory = next;
            },
            false,
            'setUserToHistorySuccess',
        );
    } catch (error: any) {
        console.log('setUserToHistory error:', error.message);
    }
};

export const getListUserHistory = (set: any, get: any) => async () => {
    try {
        const cached = await AsyncStorage.getItem(STAR_MATES_HISTORY_KEY);
        const list: UserModel[] = cached ? JSON.parse(cached) : [];

        set(
            (state: IStarMatesState) => {
                state.listUserHistory = list;
            },
            false,
            'getListUserHistorySuccess',
        );
    } catch (error: any) {
        console.log('getListUserHistory error:', error.message);
    }
};

export const removeUserFromHistory = (set: any, get: any) => async (user: UserModel) => {
    try {
        const cached = await AsyncStorage.getItem(STAR_MATES_HISTORY_KEY);
        const current: UserModel[] = cached ? JSON.parse(cached) : [];
        const normalize = (s?: string) => (s || '').trim().toLowerCase();
        const getNameKey = (u: UserModel) => normalize(u.display_name || u.user_name);
        const nameKey = getNameKey(user);
        const next = nameKey ? current.filter(u => getNameKey(u) !== nameKey) : current;
        await AsyncStorage.setItem(STAR_MATES_HISTORY_KEY, JSON.stringify(next));
        set(
            (state: IStarMatesState) => {
                state.listUserHistory = next;
            },
            false,
            'removeUserFromHistorySuccess',
        );
    } catch (error: any) {
        console.log('removeUserFromHistory error:', error.message);
    }
};

export const setUser = (set: any, get: any) => async (user: UserModel) => {
    try {
        set(
            (state: IStarMatesState) => {
                state.user = user;
            },
            false,
            'setUserSuccess',
        );
    } catch (error: any) {
        console.log('setUser error:', error.message);
    }
};