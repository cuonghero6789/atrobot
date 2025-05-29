import { create } from 'zustand';

const createStore = <T>(store: any) => {
    // return create<T, [['zustand/persist', T]]>(persist(store, {
    //   name: 'astrobot-storage',
    //   storage: createJSONStorage(() => AsyncStorage)
    // }))
    return create<T>(store);
};

const resetStore = (initState: any, set: any) => {
    set((state: any) => {
        Object.keys(initState).forEach((k: any) => {
            state[k] = initState[k];
        });
    });
};

export { createStore, create as createZustand, resetStore };
