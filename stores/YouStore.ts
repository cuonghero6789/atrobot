import { createStore } from '@/core/utils/StoreUtil';
import { setDominant } from './actions/YouAction';
import { IYouState } from './interfaces/IYouState';

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
