import { createStore } from '@/core';
import { getAccount, setAccount, setAccountTmp } from '../actions/common/AccountAction';
import IAccountState from '../interfaces/common/IAccountState';

const initState: Omit<IAccountState, 'actions'> = {
  user: undefined,
  userTmp: undefined
};

const accountStore = (set: any, get: any) =>
({
  ...initState,
  actions: {
    setAccountTmp: setAccountTmp(set, get),
    setAccount: setAccount(set, get),
    getAccount: getAccount(set, get),
  },
} as IAccountState);

const useAccountStore = createStore<IAccountState>(accountStore);

export default useAccountStore; 