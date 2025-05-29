import { colors, spacing } from '@/core/styles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
interface Props {
    placeholder?: string;
    name?: string;
    style?: any;
    onPress: () => void;
    text?: string | null;
    styleName?: any;
}

const InfoButton = ({ placeholder, style, name, text, onPress, styleName }: Props) => {
    return (
        <View style={[{ paddingHorizontal: 16, paddingTop: 16 }, style]}>
            {name && <Text style={[styles.name]}>{name}</Text>}
            <TouchableOpacity onPress={onPress}>
                <View
                    style={styles.gradientBackground}
                >
                    <Text style={[text ? styles.text : styles.placeholder, styleName]}>{text || placeholder}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default InfoButton;

const styles = StyleSheet.create({
    gradientBackground: {
        padding: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.white,
    },
    borderOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    container: {
        paddingTop: 32,
    },
    text: {
        fontSize: 16,
        color: colors.surfaceCard,
        fontWeight: "600",
    },
    name: {
        fontSize: 16,
        color: colors.surfaceCard,
        fontWeight: "600",
        marginBottom: spacing.sm
    },
    placeholder: {
        fontSize: 14,
        color: colors.surfaceDark,
        fontWeight: "400",
    },
    inputFocus: {
        borderColor: colors.white,
    },
    textInput: {
        borderRadius: spacing.ssm,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.ssm,
        backgroundColor: colors.backgroundCard,
        marginRight: spacing.sm,
        borderColor: colors.surface,
        borderWidth: 1,
        fontSize: 16,
        height: 56,
        color: colors.textLight,
    },
});
