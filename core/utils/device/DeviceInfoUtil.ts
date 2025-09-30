import { Platform } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const DEVICE_ID_STORAGE_KEY = '@astrobot_device_id';
let initializingDeviceIdPromise: Promise<string> | null = null;

const generateRandomDeviceId = async (): Promise<string> => {
    try {
        const bytes = await Crypto.getRandomBytesAsync(16);
        const hex = Array.from(bytes)
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
        return `ab-${hex}`;
    } catch (error) {
        const fallback = `ab-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
        return fallback;
    }
};

const ensureDeviceIdInitialized = async (): Promise<string> => {
    if (global.device_id && typeof global.device_id === 'string') {
        return global.device_id as string;
    }
    if (initializingDeviceIdPromise) {
        const id = await initializingDeviceIdPromise;
        global.device_id = id;
        return id;
    }
    initializingDeviceIdPromise = (async () => {
        const existing = await AsyncStorage.getItem(DEVICE_ID_STORAGE_KEY);
        if (existing) {
            return existing;
        }
        const newId = await generateRandomDeviceId();
        await AsyncStorage.setItem(DEVICE_ID_STORAGE_KEY, newId);
        return newId;
    })();
    const id = await initializingDeviceIdPromise;
    global.device_id = id;
    initializingDeviceIdPromise = null;
    return id;
};

const getDeviceInfo = () => {
    const device_id = (global.device_id as string) || 'abcs1234';
    let device_name =
        Constants.deviceName +
        ' ' +
        Constants.systemVersion +
        ' ' +
        Constants.sessionId;
    let app_version = Platform.OS === 'ios' ? Constants.platform?.ios?.buildNumber || '1.0.0' : Constants.platform?.android?.versionCode || '1.0.0';
    return { device_id, device_name, app_version };
};

export { getDeviceInfo, ensureDeviceIdInitialized };