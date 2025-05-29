import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  TextInput,
} from 'react-native';
import { colors, spacing } from '@/core/styles';
import { LinearGradient } from 'expo-linear-gradient';
interface Props {
  style?: any;
  placeholder?: string;
  text?: string;
  onChangeText?: (value: string) => void;
  onPressClose?: () => void;
  onPressBack?: () => void;
}
function SearchInput({
  style,
  placeholder,
  text,
  onChangeText,
  onPressClose,
  onPressBack,
}: Props) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressBack}>
        <Image
          source={require(`@/assets/images/ic_back_white.png`)}
          style={{ height: 24, width: 24 }}
        />
      </TouchableOpacity>

      <LinearGradient
        colors={['rgba(234, 255, 254, 0.7)', 'rgba(205, 201, 241, 0.7)']}
        style={[styles.gradientBackground]}
      >
        <Image
          source={require(`@/assets/images/ic_search.png`)}
          style={{
            height: 24,
            width: 24,
            tintColor: colors.textLight,
            marginRight: 8,
          }}
        />
        <TextInput
          style={[styles.textInput, isFocused && styles.inputFocus]}
          placeholder={placeholder}
          value={text}
          placeholderTextColor={colors.textMuted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
        />
        {text && (
          <TouchableOpacity onPress={onPressClose}>
            <Image
              source={require(`@/assets/images/ic_close_gray.png`)}
              style={{ height: 22, width: 22, tintColor: colors.textMuted }}
            />
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
}

export default SearchInput;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: spacing.large,
    borderRadius: spacing.ssm,
    paddingHorizontal: spacing.ssm,
    paddingVertical: spacing.sm
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.large,
  },

  text: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 8,
  },
  body: {
    marginLeft: spacing.large,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: 48,
    flex: 1,
  },
  inputFocus: {
    borderColor: colors.white,
    color: colors.black
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    color: colors.textLight
  },
});
