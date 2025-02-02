import { createStore } from '@/core/utils/StoreUtil';
import { getAccount, setAccount } from './actions/AccountAction';
import IAccountState from './interfaces/IAccountState';

const initState: Omit<IAccountState, 'actions'> = {
  user: undefined,
};

const accountStore = (set: any, get: any) =>
({
  ...initState,
  actions: {
    setAccount: setAccount(set, get),
    getAccount: getAccount(set, get),
  },
} as IAccountState);

const useAccountStore = createStore<IAccountState>(accountStore);

export default useAccountStore;
