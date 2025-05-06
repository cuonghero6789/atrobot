import { PermissionStatus, usePermissions } from 'expo-media-library';

export function useMediaLibraryPermission() {
    const [permission, requestPermission] = usePermissions();

    const requestMediaLibraryPermission = async (): Promise<boolean> => {
        try {
            const { status } = await requestPermission();
            return status === PermissionStatus.GRANTED;
        } catch (error) {
            console.error('Error requesting media library permission:', error);
            return false;
        }
    };

    const checkMediaLibraryPermission = (): boolean => {
        return permission?.status === PermissionStatus.GRANTED;
    };

    return {
        hasPermission: checkMediaLibraryPermission(),
        requestPermission: requestMediaLibraryPermission,
        permissionStatus: permission
    };
}
