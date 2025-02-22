import Colors from '@/styles/Colors';
import spacing from '@/styles/spacing';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
interface Props {
    placeholder: string;
    name?: string;
    style?: any;
    onPress: () => void;
    text?: string | null;
}

const InfoButton = ({ placeholder, style, name, text, onPress }: Props) => {
    return (
        <View style={{ padding: 16 }}>
            {name && <Text style={styles.name}>{name}</Text>}
            <TouchableOpacity onPress={onPress}>
                <LinearGradient
                    colors={['rgba(234, 255, 254, 0.7)', 'rgba(205, 201, 241, 0.7)']}
                    style={styles.gradientBackground}
                >
                    <LinearGradient
                        colors={['#FFFFFF', 'rgba(255, 255, 255, 0)']}
                        style={styles.borderOverlay}
                    />
                    <Text style={text ? styles.text : styles.placeholder}>{text || placeholder}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};
export default InfoButton;

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
    },
    name: {
        fontSize: 16,
        color: Colors.black1,
        fontWeight: "600",
        marginBottom: spacing.margin.small
    },
    placeholder: {
        fontSize: 14,
        color: Colors.gray4,
        fontWeight: "400",
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
