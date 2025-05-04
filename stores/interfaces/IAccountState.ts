import { UserModel } from '../../models/UserModel';

export default interface IAccountState {
  user?: UserModel;
  userTmp?: UserModel;
  
  actions: {
    setAccountTmp: (_user: UserModel) => void;
    setAccount: (_user: UserModel) => void;
    getAccount: () => void;
  };
}
