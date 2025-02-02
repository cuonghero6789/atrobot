import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image, ImageBackground } from 'expo-image';
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import CustomButton from "@/components/CustomButton";
const { width, height } = Dimensions.get('window');
import { useRouter } from 'expo-router';

export default function IndexScreen() {
    const router = useRouter();

    return <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.icon}>
            <Image source={require('@/assets/images/ic_logo.png')} style={{ width: 88, height: 88 }} />
        </View>
        <ImageBackground source={require('@/assets/images/bg_login.png')} style={{ flex: 1, justifyContent: 'center' }}>
            <ImageBackground source={require('@/assets/images/bg_astr.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <View>
                        <Button containerStyle={{ marginBottom: 16 }} title="Continue witch Google" onPress={() => { }} />
                        <Button containerStyle={{ marginBottom: 16 }} title="Continue witch Facebook" onPress={() => { }} />
                        <CustomButton title="Continue witch Apple" onPress={() => { 
                            router.replace('/(tabs)');
                        }} />
                    </View>
                    <View>
                    </View>
                </View>
            </ImageBackground>
        </ImageBackground>
    </SafeAreaView>;
}

const styles = StyleSheet.create({
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        borderTopLeftRadius: 300,
        borderTopRightRadius: 300,
    },
    container: {
        flex: 1,
    },
    text: {
        color: '#000',
        fontSize: 20,
    },
});