import { colors, fontWeight } from "@/core/styles";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
const width = Dimensions.get('window').width;
const SIZE_ITEM_LARGE = (3 * width) / 4 - 32;
const SIZE_ITEM = 80;
interface Props {
    style?: any;
}
const LoadingLuna = ({ style }: Props) => {
    return (
        <View style={[styles.container, style?.container]}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Image
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
                </Image>
                <Text style={styles.text}>{"Đang tải..."}</Text>
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
