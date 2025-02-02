import { Stack } from "expo-router";
import { useEffect } from "react";
import { router } from 'expo-router';

export default function IndexScreen() {
    return <>
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
        </Stack>
    </>;
}