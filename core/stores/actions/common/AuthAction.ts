import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserModel } from '@/core/types/common';
import { IAuthState } from '@/core/stores/interfaces';
import { AuthAction } from '@/core/stores/interfaces/common/IAuthState';
import auth from '@react-native-firebase/auth';

export const onLogout = (set: any, get: any) => async () => {
  try {
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    /** save cache for login fast */
    AsyncStorage.removeItem('AUTH_USER');
    AsyncStorage.removeItem('AUTH_STATUS');
    AsyncStorage.removeItem('ACCOUNT_USER');
    global.token = '';
    set(
      (state: IAuthState) => {
        state.user = undefined;
        state.token = '';
        state.status = AuthAction.AUTH_LOGIN;
      },
      false,
      'onLogoutSuccess',
    );
    /** save cache for login fast */
  } catch (error: any) {
    console.log('Logout error:', error.message);
  }
};

export const setTmpUser = (set: any, get: any) => async (user: UserModel) => {
  try {
    set(
      (state: IAuthState) => {
        state.user = user;
      },
      false,
      'setTmpUserSuccess',
    );
  } catch (error: any) {
    console.log('Login error:', error.message);
  }
}

export const setAuthUser =
  (set: any, get: any) => async (user: UserModel, token: string) => {
    try {
      /** save cache for login fast */
      AsyncStorage.setItem('AUTH_USER', JSON.stringify({ user, token }));
      set(
        (state: IAuthState) => {
          state.user = user;
          state.token = token;
        },
        false,
        'setAuthUserSuccess',
      );
      /** save cache for login fast */
    } catch (error: any) {
      console.log('Login error:', error.message);
    }
  };

export const setStatus = (set: any, get: any) => async (status: number) => {
  try {
    /** save cache for login fast */
    AsyncStorage.setItem('AUTH_STATUS', JSON.stringify({ status }));
    set(
      (state: IAuthState) => {
        state.status = status;
      },
      false,
      'setStatusSuccess',
    );
    /** save cache for login fast */
  } catch (error: any) {
    console.log('Login error:', error.message);
  }
};

export const getCacheAuthUser = (set: any, get: any) => async () => {
  try {
    const value = await AsyncStorage.getItem('AUTH_USER');
    const authStatus = await AsyncStorage.getItem('AUTH_STATUS');

    if (value && authStatus) {
      const { user, token } = JSON.parse(value) || {};
      const { status = 1 } = JSON.parse(authStatus) || {};
      global.token = token;
      set(
        (state: IAuthState) => {
          state.user = user;
          state.token = token;
          state.status = status;
          state.loading = false;
        },
        false,
        'getCacheAuthUserSuccess',
      );
    } else {
      set(
        (state: IAuthState) => {
          state.status = AuthAction.AUTH_LOGIN;
          state.loading = false;
        },
        false,
        'getCacheAuthUserSuccess',
      );
    }
  } catch (error: any) {
    console.log('Login get cache error:', error.message);
  }
};
