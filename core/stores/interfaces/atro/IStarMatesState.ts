import { UserModel } from "@/core/types";
import { StarMateModel } from "@/core/types/atro";

export default interface IStarMatesState {
    isLoading: boolean;
    starMate?: StarMateModel;
    user?: UserModel;
    listUserHistory?: UserModel[];

    actions: {
        setStarMate: (starMate: StarMateModel) => void;
        setUser: (user: UserModel) => void;
        setUserToHistory: (user: UserModel) => void;
        getListUserHistory: () => void;
        setIsLoading: (loading: boolean) => void;
        removeUserFromHistory: (user: UserModel) => void;
    };
}
