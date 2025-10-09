import * as ImagePicker from 'expo-image-picker';

export function useCameraPermission() {
    const [status, requestPermission] = ImagePicker.useCameraPermissions();

    const requestCameraPermission = async (): Promise<boolean> => {
        try {
            const { status } = await requestPermission();
            return status === 'granted';
        } catch (error) {
            console.error('Error requesting camera permission:', error);
            return false;
        }
    };

    const checkCameraPermission = (): boolean => {
        return status?.status === 'granted';
    };

    return {
        hasPermission: checkCameraPermission(),
        requestPermission: requestCameraPermission,
        permissionStatus: status
    };
}   