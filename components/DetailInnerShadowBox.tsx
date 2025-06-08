import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from 'react-native';
import { colors, spacing, textStyle } from '@/core/styles';
import { Button } from "./Button";
import { memo } from "react";
import { SkeletonLoaderQuestion } from "./loading/LoadingView";
import LoadingLuna from "./loading/LoadingLuna";
interface Props {
    colorStart: string;
    colorEnd: string;
    iconSource: any;
    answer?: string;
    loadingAnswer?: boolean;
}

function DetailInnerShadowBox({ colorStart, colorEnd, iconSource, answer, loadingAnswer }: Props) {
    return (
        <LinearGradient
            colors={[colorStart, colorEnd]}
            style={styles.box}
        >
            <LinearGradient
                colors={["#7EADF1A6", "white"]}
                start={{ x: 0.9, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.innerShadow}
            />
            <LinearGradient
                colors={["#7EADF1A6", "white"]}
                start={{ x: 0, y: 0.9 }}
                end={{ x: 0, y: 1 }}
                style={styles.innerShadow}
            />
            <Image source={iconSource} resizeMode="contain" style={{ width: 130, height: 156, position: 'absolute', right: spacing.sm, top: spacing.large }} />
            <Text style={[  textStyle.textBold2, { color: colors.white, marginBottom: spacing.md }]}>{"Kế hoạch sắp tới của\ntôi có suôn sẻ không?"}</Text>
            {/* <Button title={"Tối nay tôi đi hẹn hò, cuộc hẹn sẽ diễn ra như thế nào?"}
                onPress={() => { }}
                containerStyle={{ marginTop: spacing.sm, borderRadius: 5, height: 64 }}
                textStyle={textStyle.subTitleMedium1}
                buttonStyle={{ borderRadius: 5 }} /> */}
            <Text style={[textStyle.textBold2, { color: "#2155A0BF", marginBottom: spacing.xxs }]}>{"Luna"}</Text>
            <View style={{ backgroundColor: "#2155A0BF", borderRadius: spacing.sm, padding: spacing.large }}>
                {!loadingAnswer ?
                    <Text style={[textStyle.bodyText2, { color: colors.white }]}>
                        {answer}
                    </Text> :
                    <LoadingLuna />
                }
            </View>
        </LinearGradient>
    );
}

export default memo(DetailInnerShadowBox);

const styles = StyleSheet.create({
    btn: {
        borderRadius: 8,
        borderColor: colors.white,
        borderWidth: 2,
        padding: spacing.sm,
        marginTop: spacing.xTiny,
        alignItems: 'center',
    },
    box: {
        flex: 1,
        marginTop: spacing.large,
        borderRadius: 30,
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
        paddingBottom: spacing.bigx2,
        overflow: "hidden",
        position: "relative",
    },
    innerShadow: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 30,
        opacity: 0.7, // Adjust shadow visibility
    },
});