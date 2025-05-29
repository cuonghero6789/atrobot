import { colors } from '@/core/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
interface Props {
  text: string;
  onPress?: () => void;
  style?: any;
  styleName?: any
}
const Item = ({ text, onPress, style, styleName }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, style]}>
      <LinearGradient
        colors={['rgba(234, 255, 254, 0.5)', 'rgba(205, 201, 241, 0.5)']}
        style={[styles.button]}
      >
        <Text style={[styles.text, styleName]}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  wrapper: {
    height: 48,
    borderRadius: 8,
    overflow: 'hidden', // Ensures border radius is applied correctly
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8, // Top-left is 20px, others are 0px
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
  },
  container: {
    paddingVertical: 16,
  },
});
