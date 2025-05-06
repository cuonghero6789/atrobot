import { PermissionStatus, useCameraPermissions } from 'expo-camera';

export function useCameraPermission() {
    const [permission, requestPermission] = useCameraPermissions();

    const requestCameraPermission = async (): Promise<boolean> => {
        try {
            const { status } = await requestPermission();
            return status === PermissionStatus.GRANTED;
        } catch (error) {
            console.error('Error requesting camera permission:', error);
            return false;
        }
    };

    const checkCameraPermission = (): boolean => {
        return permission?.status === PermissionStatus.GRANTED;
    };

    return {
        hasPermission: checkCameraPermission(),
        requestPermission: requestCameraPermission,
        permissionStatus: permission
    };
}   