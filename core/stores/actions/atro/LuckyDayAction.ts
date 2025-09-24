import { LuckyDayModel } from "@/core/types/atro";
import ILuckyDayState from "../../interfaces/atro/ILuckyDayState";

export const setIsLoading = (set: any, get: any) => async (isLoading: boolean) => {
    set(
        (state: ILuckyDayState) => {
            state.isLoading = isLoading;
        },
        false,
        'setIsLoadingSuccess',
    );
};

export const setWeek = (set: any, get: any) => async (week: LuckyDayModel[]) => {
    set(
        (state: ILuckyDayState) => {
            state.week = week;
        },
        false,
        'setWeekSuccess',
    );
};

export const setMonth = (set: any, get: any) => async (month: LuckyDayModel[]) => {         
    set(
        (state: ILuckyDayState) => {
            state.month = month;
        },
        false,
        'setMonthSuccess',
    );
};