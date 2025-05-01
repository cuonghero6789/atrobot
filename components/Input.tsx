import Colors from '@/styles/Colors';
import spacing from '@/styles/spacing';
import TypeStyles from '@/styles/TypeStyle';
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
        <View style={{ paddingTop: spacing.padding.large, paddingHorizontal: spacing.padding.large }}>
            {name && <Text style={[TypeStyles.bodyTextBold, styles.text]}>{name}</Text>}
            <LinearGradient
                colors={['#EAFFFEB3', '#CDC9F1B3']}
                style={styles.gradientBackground}
            >
                <TextInput
                    style={[isFocused && styles.inputFocus]}
                    placeholder={placeholder}
                    value={text}
                    placeholderTextColor={Colors.gray4}
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
        <View style={{ paddingTop: spacing.padding.large, paddingHorizontal: spacing.padding.large }}>
            {name && <Text style={[TypeStyles.bodyTextBold, styles.text]}>{name}</Text>}
            <View
                style={styles.input}
            >
                <TextInput
                    style={[isFocused && styles.inputFocus]}
                    placeholder={placeholder}
                    value={text}
                    placeholderTextColor={Colors.gray4}
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
        borderRadius: 5,
        height: 56,
        paddingHorizontal: spacing.padding.base,
        justifyContent: 'center',
        borderColor: Colors.white,
        borderWidth: 1,
    },
    gradientBackground: {
        borderRadius: 5,
        height: 56,
        paddingHorizontal: spacing.padding.base,
        justifyContent: 'center',
    },
    borderOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    text: {
        color: Colors.black3,
        marginBottom: 8,
    },
    inputFocus: {
        borderColor: Colors.white,
    },
    textInput: {
        borderRadius: spacing.borderRadius.base,
        paddingVertical: spacing.padding.small,
        paddingHorizontal: spacing.padding.base,
        backgroundColor: Colors.bgColor5,
        marginRight: spacing.margin.small,
        borderColor: Colors.bgColor3,
        borderWidth: 1,
        fontSize: 16,
        height: 56,
        color: Colors.gray2,
    },
});
