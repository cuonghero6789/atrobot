import {UserModel} from '../../models/UserModel';

export enum AuthAction {
  AUTH_LOGIN = 1,
  AUTH_LANGUAGE = 2,
  AUTH_INFO = 3,
  AUTH_HOME = 4,
}
export default interface IAuthState {
  loading: boolean;
  user?: UserModel;
  status: number;
  token?: string;

  actions: {
    setAuthUser: (user: UserModel, token: string) => void;
    setStatus: (status: number) => void;
    getCacheAuthUser: () => void;
    onLogout: () => void;
  };
}
