import CustomCarousel from "@/components/Carousel";
import { HomeButtonBackground } from "@/components/home/HomeButton";
import ManifestDays from "@/components/manifest/ManifestDays";
import Colors from "@/styles/Colors";
import spacing from "@/styles/spacing";
import TypeStyles from "@/styles/TypeStyle";
import { ImageBackground } from "expo-image";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DivineScreen() {
    const insets = useSafeAreaInsets();
    return <ImageBackground source={require('@/assets/images/bg_manifest.png')} style={{ flex: 1 }}>
        <View style={[styles.info, { paddingTop: insets.top }]}>
            <Text style={[TypeStyles.title, { color: Colors.black3 }]}>{"Manifest"}</Text>
            <Text style={[TypeStyles.bodyText1, { color: Colors.gray, textAlign: "center", marginTop: spacing.margin.small }]}>{"Bạn đang mong đợi điều gì? Lắng nghe thông điệp vũ trụ và manifest ước mơ của ban!"}</Text>
        </View>
        <View style={styles.profile}>
            <ScrollView>
                <View style={{ paddingHorizontal: spacing.padding.big, paddingTop: spacing.margin.bigx2 }}>
                    <Text style={[TypeStyles.subTitle2, { color: Colors.white, textAlign: 'center' }]}>{"Khi bạn biến vô thức thành ý thức, nó sẽ định hình cuộc đời bạn và bạn sẽ gọi đó là số phận."}</Text>
                </View>
                <ManifestDays />
                <CustomCarousel />
                <View style={{ height: spacing.margin.large }} />
                <HomeButtonBackground text="Tương lai của bạn" subText="thế nào" onPress={() => { }} />
                <View style={{ height: spacing.margin.large }} />
                <HomeButtonBackground text="Tìm ngày may mắn" subText="của bạn" onPress={() => { }} />
            </ScrollView>
        </View>
    </ImageBackground>
}

const styles = StyleSheet.create({
    info: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.padding.large
    },
    profile: {
        backgroundColor: "#827EAB59",
        flex: 1,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
    },
});