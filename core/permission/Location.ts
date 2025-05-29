import strings from '@/core/localization';
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';
export async function getCurrentLocation(): Promise<Location.LocationObject | null> {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert(
            strings.t("hi"),
            strings.t("requestLocation"),
            [
                {
                    text: strings.t("cancel"),
                    style: 'cancel',
                },
                {
                    text: strings.t("agree"),
                    onPress: async () => {
                        Linking.openSettings();
                    },
                },
            ],
            { cancelable: true }
        );
        return null;
    }
    let location = await Location.getCurrentPositionAsync({});
    return location;
}