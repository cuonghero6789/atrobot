import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Rect, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
interface Props {
  title: string;  // Title of the button
  onPress: () => void;  // Callback function when the button is pressed        
  containerStyle?: any;  // Optional style for the button    
  container?: any;
  text?: any;
}
const CustomButton = ({ title, onPress, container, text }: Props) => {
  return (
    <View style={[styles.shadowWrapper, container]}>
      <TouchableOpacity onPress={onPress} style={styles.wrapper}>
        {/* Gradient Border */}
        <Svg height={50} width={270} style={styles.border}>
          <Defs>
            <SvgGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="1.41%" stopColor="#FFFFFF" />
              <Stop offset="98.85%" stopColor="rgba(255, 255, 255, 0)" />
            </SvgGradient>
          </Defs>
          <Rect
            x="0" y="0" width="100%" height="100%"
            stroke="url(#borderGradient)" strokeWidth="1"
            fill="none" rx="20" ry="0"
          />
        </Svg>

        {/* First Gradient Layer */}
        <LinearGradient
          colors={['rgba(33, 44, 160, 0.75)', 'rgba(12, 31, 58, 0.75)']}
          start={{ x: 0.2, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.gradientLayer}
        />
        {/* Second Gradient Layer */}
        <LinearGradient
          colors={['rgba(121, 117, 131, 0.2)', 'rgba(54, 53, 103, 0.2)']}
          start={{ x: 0.2, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.gradientLayer}
        />

        {/* Button Text */}
        <Text style={[styles.text, text]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowWrapper: {
    shadowColor: '#18303F',
    shadowOffset: { width: 40, height: 40 },
    shadowOpacity: 0.1,
    shadowRadius: 50,
  },
  wrapper: {
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    opacity: 0.86, // Transparency applied to the whole button
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  gradientLayer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});

export default CustomButton;
