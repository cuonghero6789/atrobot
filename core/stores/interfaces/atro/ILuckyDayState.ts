import { LuckyDayModel, PlanetModel, PlanetSignModel } from '@/core/types/atro';

export default interface ILuckyDayState {
    isLoading: boolean;
    week?: LuckyDayModel[];
    month?: LuckyDayModel[];
    actions: {
        setIsLoading: (loading: boolean) => void;
        setWeek: (week: LuckyDayModel[]) => void;
        setMonth: (month: LuckyDayModel[]) => void;
    };
}
