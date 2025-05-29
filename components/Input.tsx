import { colors, spacing, textStyle } from '@/core/styles';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
    placeholder: string;
    name?: string;
    style?: any;
    onChangeText?: (value: string) => void;
    text: string;
}

const Input = ({ placeholder, style, name, onChangeText, text }: Props) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <View style={{ paddingTop: spacing.md, paddingHorizontal: spacing.md }}>
            {name && <Text style={[textStyle.bodyTextBold, styles.text]}>{name}</Text>}
            <LinearGradient
                colors={['#EAFFFEB3', '#CDC9F1B3']}
                style={styles.gradientBackground}
            >
                <TextInput
                    style={[isFocused && styles.inputFocus]}
                    placeholder={placeholder}
                    value={text}
                    placeholderTextColor={colors.surfaceDark}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={onChangeText}
                />
            </LinearGradient>
        </View>
    );
};

const CustomInput = ({ placeholder, style, name, onChangeText, text }: Props) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <View style={{ paddingTop: spacing.md, paddingHorizontal: spacing.md }}>
            {name && <Text style={[textStyle.bodyTextBold, styles.text]}>{name}</Text>}
            <View style={styles.input}>
                <TextInput
                    style={[isFocused && styles.inputFocus]}
                    placeholder={placeholder}
                    value={text}
                    placeholderTextColor={colors.surfaceDark}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={onChangeText}
                />
            </View>
        </View>
    );
};

export {
    Input,
    CustomInput
};

const styles = StyleSheet.create({
    input: {
        borderRadius: spacing.xxs,
        height: 56,
        paddingHorizontal: spacing.ssm,
        justifyContent: 'center',
        borderColor: colors.white,
        borderWidth: 1,
    },
    gradientBackground: {
        borderRadius: spacing.xxs,
        height: 56,
        paddingHorizontal: spacing.ssm,
        justifyContent: 'center',
    },
    text: {
        color: colors.surfaceElevated,
        marginBottom: spacing.sm,
    },
    inputFocus: {
        borderColor: colors.white,
    },
});
