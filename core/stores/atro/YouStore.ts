import { createStore } from '@/core';
import { setDominant } from '@/core/stores/actions/atro/YouAction';
import { IYouState } from '@/core/stores/interfaces/atro/IYouState';

const initState: Omit<IYouState, 'actions'> = {
    dominant: {}
};

const youStore = (set: any, get: any) =>
  ({
    ...initState,
    actions: {
      setDominant: setDominant(set, get),
    },
  } as IYouState);

const useYouStore = createStore<IYouState>(youStore);

export default useYouStore;
