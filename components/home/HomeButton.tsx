import Colors from "@/styles/Colors";
import spacing from "@/styles/spacing";
import TypeStyles from "@/styles/TypeStyle";
import { ImageBackground } from "expo-image";
import { memo } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
const WIDTH = width;
const HEIGHT = WIDTH * 72 / 390;

interface Props {
    onPress?: () => void;
    text?: string;
    subText?: string;
}

function HomeButton({ onPress, text }: Props) {
    return <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={[TypeStyles.subTitle, styles.text]}>{text}</Text>
        </TouchableOpacity>
    </View>
}
function HomeButtonBackground({ onPress, text, subText }: Props) {
    return <ImageBackground source={require('@/assets/images/bg_btn.png')} style={{ width: WIDTH, height: HEIGHT }}>
        <TouchableOpacity onPress={onPress} style={styles.btn}>
            <Text style={[TypeStyles.textBold1, styles.textGreen]}>{text}<Text style={[TypeStyles.text1, styles.textGreen]}>{` ${subText}`}</Text></Text>
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
        paddingHorizontal: spacing.padding.big,
        paddingVertical: spacing.padding.xSmall,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF33',
        shadowColor: Colors.black,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 50,
        width: 142,
        height: 31
    },
    textGreen: {
        color: Colors.green
    },
    text: {
        color: Colors.white,
    }
});