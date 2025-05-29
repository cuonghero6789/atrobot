import { createStore } from '@/core';
import {
  getCacheAuthUser,
  onLogout,
  setAuthUser,
  setStatus,
  setTmpUser,
} from '../actions/common/AuthAction';
import IAuthState, { AuthAction } from '../interfaces/common/IAuthState';

const initState: Omit<IAuthState, 'actions'> = {
  loading: true,
  user: undefined,
  status: 1,
  token: undefined,
};

const authStore = (set: any, get: any) =>
({
  ...initState,
  actions: {
    setAuthUser: setAuthUser(set, get),
    setStatus: setStatus(set, get),
    getCacheAuthUser: getCacheAuthUser(set, get),
    onLogout: onLogout(set, get),
    setTmpUser: setTmpUser(set, get),
  },
} as IAuthState);

const useAuthStore = createStore<IAuthState>(authStore);

export default useAuthStore; 