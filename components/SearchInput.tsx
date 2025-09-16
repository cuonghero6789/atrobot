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
      <TouchableOpacity onPress={onPressBack} style={styles.backBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Image
          source={require(`@/assets/images/ic_back_white.png`)}
          style={{ height: 20, width: 20, tintColor: colors.white }}
        />
      </TouchableOpacity>
      <LinearGradient
        colors={["rgba(255,255,255,0.55)", "rgba(255,255,255,0.25)"]}
        style={[styles.gradientBackground, isFocused && styles.gradientFocused, style]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Image
          source={require(`@/assets/images/ic_search.png`)}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.textInput]}
          placeholder={placeholder}
          value={text}
          placeholderTextColor={colors.textMuted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          returnKeyType="search"
        />
        {!!text && (
          <TouchableOpacity onPress={onPressClose} style={styles.clearBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Image
              source={require(`@/assets/images/ic_close_gray.png`)}
              style={{ height: 14, width: 14, tintColor: colors.textMuted }}
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
    alignItems: 'center',
    marginLeft: spacing.ssm,
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    height: 46,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
  },
  gradientFocused: {
    borderColor: colors.white,
    shadowOpacity: 0.25,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm
  },
  backBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)'
  },
  searchIcon: {
    height: 20,
    width: 20,
    tintColor: colors.textLight,
    marginRight: 10,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    color: colors.black
  },
  clearBtn: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
