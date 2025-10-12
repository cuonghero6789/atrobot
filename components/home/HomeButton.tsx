import { colors, spacing, textStyle } from "@/core/styles";
import { ImageBackground } from "expo-image";
import { useEffect, useRef } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Dimensions, Animated, Easing, useWindowDimensions, Platform } from "react-native";
const { width, height } = Dimensions.get('window');
const WIDTH = width;
const HEIGHT = WIDTH * 72 / 390;

interface Props {
    onPress?: () => void;
    text?: string;
    subText?: string;
}

function HomeButton({ onPress, text }: Props) {
    const pulse = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.timing(pulse, {
                    toValue: 0,
                    duration: 1200,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                })
            ])
        );
        animation.start();
        return () => {
            animation.stop();
        };
    }, [pulse]);

    const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] });
    const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] });

    return <View style={{ alignItems: 'center' }}>
        <Animated.View style={{ transform: [{ scale }], opacity }}>
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <Text style={[textStyle.subTitle, styles.text]}>{text}</Text>
            </TouchableOpacity>
        </Animated.View>
    </View>
}
function HomeButtonBackground({ onPress, text, subText }: Props) {
    const { width: screenWidth } = useWindowDimensions();
    const autoWidth = Platform.OS === 'web' ? Math.min(screenWidth - spacing.large * 2, 1084) : WIDTH;
    const autoHeight = Platform.OS === 'web' ? (autoWidth * 72 / 390) : HEIGHT;
    return <ImageBackground source={require('@/assets/images/bg_btn.png')} style={{ width: autoWidth, height: autoHeight }}>
        <TouchableOpacity onPress={onPress} style={styles.btn}>
            <Text style={[textStyle.textBold, styles.textGreen]}>{text}<Text style={[textStyle.text, styles.textGreen]}>{` ${subText}`}</Text></Text>
        </TouchableOpacity>
    </ImageBackground>
}

export {
    HomeButton,
    HomeButtonBackground
};

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF44',
        shadowColor: colors.black,
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 1,
        shadowRadius: 50,
        width: 142,
        height: 31
    },
    textGreen: {
        color: colors.success
    },
    text: {
        color: colors.white,
    }
});