import { colors, fontWeight } from "@/core/styles";
import { View, Text, StyleSheet, useWindowDimensions, ImageBackground } from "react-native";
import { Image } from "expo-image";
import strings from '@/core/localization';
const SIZE_ITEM = 80;
interface Props {
    style?: any;
}
const LoadingLuna = ({ style }: Props) => {
    const { width: screenWidth } = useWindowDimensions();
    // Responsive container size: 75% of width capped to avoid oversizing on web
    const SIZE_ITEM_LARGE = Math.max(200, Math.min(screenWidth * 0.75 - 32, 480));
    return (
        <View style={[styles.container, style?.container]}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <ImageBackground
                    source={require('../../assets/images/ic_loading.gif')}
                    style={{
                        width: SIZE_ITEM_LARGE,
                        height: SIZE_ITEM_LARGE,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Image
                        source={require('../../assets/images/ic_loading_new.png')}
                        style={{ width: SIZE_ITEM, height: SIZE_ITEM }}
                    />
                </ImageBackground>
                <Text style={styles.text}>{strings.t('loading')}</Text>
            </View>
        </View>
    );
};

export default LoadingLuna;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    text: {
        color: colors.white,
        fontWeight: fontWeight.bold,
        textAlign: 'center',
        marginTop: 16,
    },
});
