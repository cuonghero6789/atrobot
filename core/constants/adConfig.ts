import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

const isDev = __DEV__;

// Thay các giá trị này bằng Ad Unit ID thật của bạn
const REAL_AD_UNIT_IDS = {
    BANNER: Platform.select({
        ios: 'ca-app-pub-8326859693302166/2750427978',
        android: 'ca-app-pub-8326859693302166/2818361997',
    }),
    NATIVE: Platform.select({
        ios: 'ca-app-pub-8326859693302166/6498101296',
        android: 'ca-app-pub-8326859693302166/6566035319',
    }),
    INTERSTITIAL: Platform.select({
        ios: 'ca-app-pub-8326859693302166/8775096063',
        android: 'ca-app-pub-8326859693302166/8775096063',
    }),
    REWARDED: Platform.select({
        ios: 'ca-app-pub-8326859693302166/1033736219',
        android: 'ca-app-pub-xxxxxxxxxxxxxxxx/android-rewarded-id',
    }),
};

export const AdUnitIds = {
    BANNER: isDev ? TestIds.BANNER : REAL_AD_UNIT_IDS.BANNER,
    NATIVE: isDev ? TestIds.NATIVE : REAL_AD_UNIT_IDS.NATIVE,
    REWARDED: isDev ? TestIds.REWARDED : REAL_AD_UNIT_IDS.REWARDED,
    INTERSTITIAL: isDev ? TestIds.INTERSTITIAL : REAL_AD_UNIT_IDS.INTERSTITIAL,
};

export const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 83 : 56;
export const FLOATING_MENU_HEIGHT = TAB_BAR_HEIGHT + 76;