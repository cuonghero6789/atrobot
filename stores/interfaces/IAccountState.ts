import { UserModel } from '../../models/UserModel';

export default interface IAccountState {
  user?: UserModel;

  actions: {
    setAccount: (_user: UserModel) => void;
    getAccount: () => void;
  };
}
