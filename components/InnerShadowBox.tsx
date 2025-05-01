import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from 'react-native';
import Colors from "@/styles/Colors";
import spacing, { borderRadius } from "@/styles/spacing";
import TypeStyles from "@/styles/TypeStyle";
import { Button } from "./Button";
import { useState } from "react";
import ActionInput from "./ActionInput";
interface Props {
    colorStart: string;
    colorEnd: string;
    iconSource: any;
    onPress: (text: string) => void;
    data?: string[];
}
export default function InnerShadowBox({ colorStart, colorEnd, iconSource, onPress, data }: Props) {
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
            <Image source={iconSource} resizeMode="contain" style={{ width: 130, height: 156, position: 'absolute', right: spacing.margin.small, top: spacing.margin.large }} />
            <Text style={[TypeStyles.textBold2, { color: Colors.white }]}>{"Kế hoạch sắp tới của\ntôi có suôn sẻ không?"}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.margin.big }}>
                <View style={{ height: 21, width: 2, backgroundColor: Colors.white }} />
                <Text style={[TypeStyles.bodyTextBold, { color: Colors.white, marginHorizontal: spacing.margin.small }]}>{"Câu hỏi gợi ý"}</Text>
            </View>
            {data?.map((item, index) => (
                <Button key={`key_${index}`} title={item}
                    onPress={() => onPress(item)}
                    containerStyle={{ marginTop: spacing.margin.small, borderRadius: 5, minHeight: 64 }}
                    textStyle={TypeStyles.subTitleMedium1}
                    buttonStyle={{ borderRadius: 5, paddingHorizontal: spacing.padding.large }} />
            ))}
            <TouchableOpacity style={styles.btn}>
                <Text style={[TypeStyles.textBold3, { color: Colors.white }]}>{"Gợi ý thêm"}</Text>
            </TouchableOpacity>
            <ActionInput placeholder="Hoặc tự viết câu hỏi của bạn" onPress={(text) => onPress(text)} />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 8,
        borderColor: Colors.white,
        borderWidth: 2,
        padding: spacing.padding.small,
        marginTop: spacing.margin.small,
        alignItems: 'center',
    },
    box: {
        flex: 1,
        marginTop: spacing.margin.large,
        // backgroundColor: "#7EADF1A6",
        borderRadius: 30,
        paddingHorizontal: spacing.padding.big,
        paddingTop: spacing.padding.big,
        paddingBottom: spacing.margin.bigx2,
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