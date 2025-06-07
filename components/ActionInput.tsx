import { colors, spacing, textStyle } from '@/core/styles';
import React, { memo } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
interface Props {
    placeholder: string;
    name?: string;
    onPress: (text: string) => void;
}

const ActionInput = ({ placeholder, name, onPress }: Props) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [text, setText] = React.useState('');
    return (
        <View style={{ paddingTop: spacing.sm }}>
            {name && <Text style={[textStyle.description, styles.text]}>{name}</Text>}
            <View
                style={[styles.btn, isFocused ? { justifyContent: 'space-between' } : null]}
            >
                <View style={{ flex: 1, ...(!isFocused && { alignItems: 'center' }) }}>
                    <TextInput
                        style={[isFocused && styles.inputFocus, { alignItems: 'center', color: colors.white, paddingVertical: 4 }]}
                        placeholder={placeholder}
                        value={text}
                        placeholderTextColor={colors.white}
                        focusable
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChangeText={(text) => setText(text)}
                    />
                </View>
                {
                    text.length > 0 &&
                    <TouchableOpacity onPress={() => {
                        onPress(text);
                        setText('');
                    }}>
                        <Feather name="send" size={24} color={colors.white} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};
export default memo(ActionInput);

const styles = StyleSheet.create({
    btn: {
        borderRadius: 8,
        borderColor: colors.white,
        borderWidth: 2,
        padding: spacing.sm,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    borderOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    text: {
        color: colors.surfaceElevated,
        marginBottom: 8,
    },
    inputFocus: {
        borderColor: colors.white,
        justifyContent: 'space-between',
    },
    textInput: {
        borderRadius: spacing.md,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.backgroundCard,
        marginRight: spacing.sm,
        borderColor: colors.surface,
        borderWidth: 1,
        fontSize: 16,
        height: 56,
        color: colors.textLight,
    },
});
