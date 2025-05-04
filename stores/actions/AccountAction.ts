import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserModel } from '../../models/UserModel';
import IAccountState from '../interfaces/IAccountState';
import strings from '../../localization';
import { getLocales } from 'expo-localization';
export const setAccount = (set: any, get: any) => async (user: UserModel) => {
  try {
    if (strings.locale !== user.language_code && user?.language_code) {
      strings.locale = user.language_code || 'en';
    }
    /** save cache for login fast */
    AsyncStorage.setItem('ACCOUNT_USER', JSON.stringify({ user }));
    set(
      (state: IAccountState) => {
        state.user = user;
      },
      false,
      'setAccountSuccess',
    );
    /** save cache for login fast */
  } catch (error: any) {
    console.log('setAccount error:', error.message);
  }
};

export const setAccountTmp = (set: any, get: any) => async (user: UserModel) => {
  try {
    set(
      (state: IAccountState) => {
        state.userTmp = user;
      },
      false,
      'setAccountTmpSuccess',
    );
    /** save cache for login fast */
  } catch (error: any) {
    console.log('setAccountTmp error:', error.message);
  }
};

export const getAccount = (set: any, get: any) => async () => {
  try {
    const value = await AsyncStorage.getItem('ACCOUNT_USER');
    if (value !== null) {
      /** save cache for login fast */
      const user = JSON.parse(value).user;
      if (getLocales()[0].languageCode !== user.language_code && user?.language_code) {
        strings.locale = user.language_code;
      }
      set(
        (state: IAccountState) => {
          state.user = JSON.parse(value).user;
        },
        false,
        'getAccountSuccess',
      );
      /** save cache for login fast */
    } else {
      strings.locale = 'en';
      set(
        (state: IAccountState) => {
          state.user = { language_code: 'en' };
        },
        false,
        'getAccountSuccess',
      );
    }
  } catch (error: any) {
    console.log('getAccount error:', error.message);
  }
};
