import { Stack } from "expo-router";
import { useEffect } from "react";
import {router} from 'expo-router';

export default function AuthScreen() {
    return <>
    <Stack>
        <Stack.Screen name="login" />
    </Stack>
    </>;
}