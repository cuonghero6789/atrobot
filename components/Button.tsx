import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
interface Props {
  title?: string;
  onPress: () => void;
  containerStyle?: any;
  buttonStyle?: any;
  textStyle?: any
  icon?: any
}
const Button = ({ title, onPress, containerStyle, buttonStyle, textStyle }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, containerStyle]}>
      <LinearGradient
        colors={['rgba(234, 255, 254, 0.5)', 'rgba(205, 201, 241, 0.5)']}
        style={[styles.button, buttonStyle]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
function BackButton({ onPress, containerStyle }: Props) {
  return <TouchableOpacity onPress={onPress} style={containerStyle}>
    <Image source={require('@/assets/images/ic_back.png')}
      style={{ width: 56, height: 56, marginHorizontal: 16 }} />
  </TouchableOpacity>
}

function ButtonIcon({ icon, onPress, containerStyle }: Props) {
  return <TouchableOpacity onPress={onPress} style={containerStyle}>
    <Image
      contentFit='contain'
      source={icon}
      style={{ width: 65, height: 65 }} />
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  wrapper: {
    height: 48,
    borderRadius: 20,
    overflow: 'hidden', // Ensures border radius is applied correctly
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 60,
    borderRadius: 20, // Top-left is 20px, others are 0px
    borderTopWidth: 1, // Only top border
    borderLeftWidth: 1, // Only left border,
    borderRightWidth: 1, // Only right border
    borderColor: 'rgba(255, 255, 255, 0.5)', // Placeholder for gradient border
    opacity: 1, // React Native does not support `opacity: 0px`, default to 1
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});

export { Button, BackButton, ButtonIcon };
