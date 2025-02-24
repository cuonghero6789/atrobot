import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from 'react-native';
import Colors from "@/styles/Colors";
import spacing, { borderRadius } from "@/styles/spacing";
import TypeStyles from "@/styles/TypeStyle";
import { Button } from "./Button";
interface Props {
    colorStart: string;
    colorEnd: string;
    iconSource: any;
    onPress: () => void
}
export default function InnerShadowBox({ colorStart, colorEnd, iconSource, onPress }: Props) {
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
            <Button title={"Tối nay tôi đi hẹn hò, cuộc hẹn sẽ diễn ra như thế nào?"}
                onPress={onPress}
                containerStyle={{ marginTop: spacing.margin.small, borderRadius: 5, height: 64 }}
                textStyle={TypeStyles.subTitleMedium1}
                buttonStyle={{ borderRadius: 5 }} />
            <Button title={"Tôi có một dự án đầu tư mới, nó sẽ như thế nào?"}
                onPress={() => { }}
                containerStyle={{ marginTop: spacing.margin.small, borderRadius: 5, height: 64 }}
                textStyle={TypeStyles.subTitleMedium1}
                buttonStyle={{ borderRadius: 5 }} />
            <Button title={"Tôi đang chuẩn bị chuyển việc, điều đó có ổn không?"}
                onPress={() => { }}
                containerStyle={{
                    marginTop: spacing.margin.small,
                    borderRadius: 5,
                    height: 64,
                    marginBottom: spacing.margin.small
                }}
                textStyle={TypeStyles.subTitleMedium1}
                buttonStyle={{ borderRadius: 5 }} />
            <TouchableOpacity style={styles.btn}>
                <Text style={[TypeStyles.textBold3, { color: Colors.white }]}>{"Gợi ý thêm"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Text style={[TypeStyles.textBold3, { color: Colors.white }]}>{"hoặc Tự viết câu hỏi của bạn"}</Text>
            </TouchableOpacity>
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