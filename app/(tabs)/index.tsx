import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { getCurrentLocation } from '@/core/permission/Location';

export default function DailyScreen() {
  useEffect(() => {
    const location = async () => {
      const data = await getCurrentLocation();
      console.log(`data: ${JSON.stringify(data)}`);
    }
    location();
  }, []);

  return <LinearGradient
    colors={['rgba(45, 121, 229, 0.79)', '#B2D1FD']}
    style={styles.container}
  >
    <Text style={styles.text}>Hello, React Native!</Text>
  </LinearGradient>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 20,
  },
});