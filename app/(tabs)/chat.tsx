import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
export default function ChatScreen() {
    return (
        <LinearGradient
          colors={['#2D79E5', '#FFFFFF']}
          start={[0, 0]}
          end={[0, 1]}
          style={styles.container}
        >
          <Text style={styles.text}>Hello, World!</Text>
        </LinearGradient>
      );
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