import { Stack } from "expo-router";
import { useEffect } from "react";
import { router } from 'expo-router';
import useAuthStore from "@/stores/AuthStore";
import useAccountStore from "@/stores/AccountStore";

export default function IndexScreen() {
    return <>
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="UpdateLang" />
            <Stack.Screen name="TimeZonesScreen" />
        </Stack>
    </>;
}