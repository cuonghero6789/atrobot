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
}
export default function DetailInnerShadowBox({ colorStart, colorEnd, iconSource }: Props) {
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
            <Text style={[TypeStyles.textBold2, { color: Colors.white, marginBottom: spacing.margin.big }]}>{"Kế hoạch sắp tới của\ntôi có suôn sẻ không?"}</Text>
            <Button title={"Tối nay tôi đi hẹn hò, cuộc hẹn sẽ diễn ra như thế nào?"}
                onPress={() => { }}
                containerStyle={{ marginTop: spacing.margin.small, borderRadius: 5, height: 64 }}
                textStyle={TypeStyles.subTitleMedium1}
                buttonStyle={{ borderRadius: 5 }} />
            <Text style={[TypeStyles.textBold2, { color: "#2155A0BF", marginTop: spacing.margin.large, marginBottom: spacing.margin.xSmall }]}>{"Luna"}</Text>
            <View style={{ backgroundColor: "#2155A0BF", borderRadius: spacing.borderRadius.small, padding: spacing.padding.large }}>
                <Text style={[TypeStyles.bodyText2, { color: Colors.white }]}>
                    {"Chào Quỳnh Anh xinh đẹp! 🌟 Luna đây, chuyên gia chiêm tinh học siêu cấp vũ trụ nè! 😉 Hôm nay chúng ta sẽ cùng nhau khám phá tương lai sự nghiệp của bạn nhé. Sẵn sàng chưa? Let's go! 🚀 Ôi trời, nhìn bản đồ sao của bạn mà Luna phải thốt lên: Wow, đúng là một bầu trời đầy sao sáng! 🌠 Đầu tiên, với cung Mặt trời ở Thiên Bình, bạn có khả năng đối nhân xử thế và tài ngoại giao tuyệt vời. Điều này sẽ giúp ích rất nhiều trong sự nghiệp đấy! 👍 Giờ hãy xem xét các hành tinh đang quá cảnh (transit) nhé:  Mặt trời, Mặt trăng, Sao Thủy và Sao Kim đều đang quá cảnh qua cung Thiên Bình, nhà 11 của bạn. Đây là một sự tập trung năng lượng cực kỳ tích cực! 🎉"}
                </Text>
            </View>
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