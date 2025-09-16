import { DominantModel } from "@/core/types/atro";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const setDominant = (set: any, get: any) => async (_dominant: DominantModel) => {
    try {
        await AsyncStorage.setItem('YOU_DOMINANT', JSON.stringify(_dominant));
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

export const getCacheDominant = (set: any, get: any) => async () => {
    try {
        const value = await AsyncStorage.getItem('YOU_DOMINANT');
        if (value) {
            const dominant: DominantModel = JSON.parse(value);
            set(
                (state: any) => {
                    state.dominant = dominant;
                },
                false,
                'getCacheDominantSuccess',
            );
        }
    } catch (error: any) {
        console.log('Get cache dominant error:', error.message);
    }
}