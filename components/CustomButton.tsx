import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Rect, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import Colors from '@/styles/Colors';
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
        {/* First Gradient Layer */}
        <LinearGradient
          colors={['#2D79E5DB', '#274877DB']}
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
    borderTopWidth: 1,
    borderTopColor: Colors.white,
    borderLeftWidth: 1,
    borderLeftColor: Colors.white,
    borderRightColor: Colors.white,
    borderRightWidth: 1,
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
