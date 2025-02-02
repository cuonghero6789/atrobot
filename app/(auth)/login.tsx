import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LoginScreen() {
    useEffect(() => {
        // alert("cuonghero login");
        // router.replace('/auth/login');
    }, []);

    return <View style={styles.container}>
            <Text>Login</Text>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#000',
        fontSize: 20,
    },
});   