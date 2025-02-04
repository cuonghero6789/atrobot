import { Platform } from 'react-native';
import Constants from 'expo-constants';

const getDeviceInfo = () => {
    const device_id = global.device_id || 'abcs1234';
    let device_name =
        Constants.deviceName +
        ' ' +
        Constants.systemVersion +
        ' ' +
        Constants.sessionId;
    let app_version = Platform.OS === 'ios' ? Constants.platform?.ios?.buildNumber || '1.0.0' : Constants.platform?.android?.versionCode || '1.0.0';
    return { device_id, device_name, app_version };
};

export { getDeviceInfo };