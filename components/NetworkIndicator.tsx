import React, { useEffect, useState, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import strings from '@/core/localization';

export default function NetworkIndicator() {
  const [visible, setVisible] = useState(false);
  const [manuallyDismissed, setManuallyDismissed] = useState(false);
  const translateY = useRef(new Animated.Value(-50)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      let online: boolean;
      if (state.isInternetReachable === null || typeof state.isInternetReachable === 'undefined') {
        online = Boolean(state.isConnected);
      } else {
        online = Boolean(state.isConnected) && state.isInternetReachable;
      }
      setVisible(!online);
      if (online) setManuallyDismissed(false); // reset manual dismiss when back online
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (visible && !manuallyDismissed) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [visible, manuallyDismissed, translateY, opacity]);

  if (!visible || manuallyDismissed) return null;

  return (
    <Animated.View
      style={[
        styles.banner,
        {
          transform: [{ translateY }],
          opacity,
          paddingTop: insets.top,
        },
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <TouchableOpacity activeOpacity={1} style={{ flex: 1, width: Dimensions.get("window").width, alignItems: 'center' }} onPress={() => {
        console.log('onPress');
        Animated.timing(translateY, {
          toValue: -50,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setManuallyDismissed(true);
        });
      }}>
        <Text style={styles.text}>{strings.t('noInternetConnection')}</Text>
      </TouchableOpacity>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    zIndex: 9999,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 