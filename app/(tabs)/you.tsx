import { ImageBackground } from "expo-image";

export default function YouScreen() {
    return <ImageBackground source={require('@/assets/images/bg_home.png')} style={{ flex: 1 }}>
    </ImageBackground>
}