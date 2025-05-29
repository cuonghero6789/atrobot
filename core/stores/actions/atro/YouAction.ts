import { DominantModel } from "@/core/types/atro";
export const setDominant = (set: any, get: any) => async (_dominant: DominantModel) => {
    try {
        set(
            (state: any) => {
                state.dominant = _dominant;
            },
            false,
            'setDominantSuccess',
        );
    } catch (error: any) {
        console.log('Login error:', error.message);
    }
}