import Colors from '@/constants/Colors';
import spacing from '@/constants/spacing';
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
        <View style={{ padding: 16 }}>
            {name && <Text style={styles.text}>{name}</Text>}
            <LinearGradient
                colors={['rgba(234, 255, 254, 0.7)', 'rgba(205, 201, 241, 0.7)']}
                style={styles.gradientBackground}
            >
                <LinearGradient
                    colors={['#FFFFFF', 'rgba(255, 255, 255, 0)']}
                    style={styles.borderOverlay}
                />
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
export default Input;

const styles = StyleSheet.create({
    gradientBackground: {
        padding: 20,
        borderRadius: 10,
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
        color: Colors.black1,
        fontWeight: "600",
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
