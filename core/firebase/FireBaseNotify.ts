import { getMessaging, requestPermission, AuthorizationStatus, getToken } from '@react-native-firebase/messaging';
export default class FirebaseNotify {
    static async requestUserPermission() {
        const authStatus = await requestPermission(getMessaging());
        const enabled =
            authStatus === AuthorizationStatus.AUTHORIZED ||
            authStatus === AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }
    static async getToken() {
        let token = await getToken(getMessaging());
        console.log('fcm token === ', token);

        if (token) {
            // update token
        }
    }
}