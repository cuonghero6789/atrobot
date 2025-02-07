import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
interface Props {
    title?: string
}
const ConfirmButton = ({ title }: Props) => {
    return (
        <TouchableOpacity style={styles.button}>
            <LinearGradient
                colors={["rgba(33, 44, 160, 0.75)", "rgba(12, 31, 58, 0.75)", "rgba(121, 117, 131, 0.2)", "rgba(54, 53, 103, 0.2)"]}
                start={{ x: 0.1, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.gradient}
            >
                <Text style={styles.text}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 268,
        height: 48,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        opacity: 0.86,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.32,
        shadowRadius: 4,
        elevation: 5,
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 93,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        backdropFilter: "blur(14px)",
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ConfirmButton;
