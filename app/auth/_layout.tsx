import { Stack } from "expo-router";
import { useEffect } from "react";
import {router} from 'expo-router';

export default function AuthScreen() {
    useEffect(() => {
        alert("cuonghero");
        // router.replace('/auth/login');
    }, []);
    return <>
    <Stack>
        <Stack.Screen name="login" />
    </Stack>
    </>;
}