import React from 'react';
import { View } from 'react-native';

export const BANNER_HEIGHT = 0;

export const BannerAdmob: React.FC<{ style?: any; onAdLoaded?: () => void; onAdFailedToLoad?: () => void }> = () => {
  return <View />; // No ads on web
};

export const NativeAdmob: React.FC<{ screenName?: string }> = () => {
  return null; // No native ads on web
};


