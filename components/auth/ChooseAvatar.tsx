import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCameraPermission } from '@/core/permission/useCamera';
import { useMediaLibraryPermission } from '@/core/permission/useMediaLibrary';
import * as ImagePicker from 'expo-image-picker';
import Colors from '@/styles/Colors';
import spacing from '@/styles/spacing';
import { LinearGradient } from 'expo-linear-gradient';

interface ChooseAvatarProps {
    onImageSelected: (uri: string, base64: string, fileName: string, type: string) => void;
}

export function ChooseAvatar({ onImageSelected }: ChooseAvatarProps) {
    const [scaleAnim] = useState(new Animated.Value(1));
    const { hasPermission: hasCameraPermission, requestPermission: requestCameraPermission } = useCameraPermission();
    const { hasPermission: hasMediaPermission, requestPermission: requestMediaPermission } = useMediaLibraryPermission();

    const animatePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleTakePhoto = async () => {
        animatePress();
        if (!hasCameraPermission) {
            const granted = await requestCameraPermission();
            if (!granted) return;
        }

        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: 'images',
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.3,
                base64: true,
                exif: true,
            });
            if (!result.canceled && result.assets[0]) {
                const { uri, base64, fileName, mimeType } = result.assets[0];
                console.log(`uri ===`, uri);
                console.log(`fileName ===`, fileName);
                console.log(`mimeType ===`, mimeType);
                onImageSelected(
                    uri,
                    base64 || '',
                    fileName || '',
                    mimeType || ''
                );
            }
        } catch (error) {
            console.error('Error taking photo:', error);
        }
    };

    const handleSelectFromLibrary = async () => {
        animatePress();
        if (!hasMediaPermission) {
            const granted = await requestMediaPermission();
            if (!granted) return;
        }

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images',
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.3,
                base64: true,
                exif: true,
            });

            if (!result.canceled && result.assets[0]) {
                const { uri, base64, fileName, mimeType } = result.assets[0];
                console.log(`uri ===`, uri);
                console.log(`fileName ===`, fileName);
                console.log(`mimeType ===`, mimeType);
                onImageSelected(
                    uri,
                    base64 || '',
                    fileName || '',
                    mimeType || ''
                );
            }
        } catch (error) {
            console.error('Error selecting image:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleAnim }] }]}>
                <View
                    style={styles.gradient}
                >
                    <View style={styles.buttons}>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={handleTakePhoto}
                            activeOpacity={0.7}
                        >
                            <MaterialIcons name="camera-alt" size={24} color={Colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={handleSelectFromLibrary}
                            activeOpacity={0.7}
                        >
                            <MaterialIcons name="photo-library" size={24} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: spacing.margin.large,
    },
    buttonContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    gradient: {
        padding: spacing.padding.base,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.padding.bigx2,
    },
    button: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: '#2D79E5',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
});
