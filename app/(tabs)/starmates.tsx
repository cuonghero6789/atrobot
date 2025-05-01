import CustomCarousel from "@/components/Carousel";
import CustomButton from "@/components/CustomButton";
import DropDownButton from "@/components/DropDownButton";
import { HomeButtonBackground } from "@/components/home/HomeButton";
import { CustomInput, Input } from "@/components/Input";
import ManifestDays from "@/components/manifest/ManifestDays";
import Colors from "@/styles/Colors";
import spacing from "@/styles/spacing";
import TypeStyles from "@/styles/TypeStyle";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StarMatesScreen() {
    const insets = useSafeAreaInsets();
    const [isEnabled, setIsEnabled] = React.useState(false);

    return <ImageBackground source={require('@/assets/images/bg_home.png')} style={{ flex: 1 }}>
        <ImageBackground source={require('@/assets/images/bg_sun.png')} tintColor={'#FFFFFF75'} style={{ width: 338, height: 338, position: 'absolute', right: 0, top: 0 }} />
        <View style={[styles.info, { paddingTop: insets.top }]}>
            <Text style={[TypeStyles.title, { color: Colors.black3 }]}>{"StarMates"}</Text>
            <Text style={[TypeStyles.bodyText1, { color: Colors.gray, textAlign: "center", marginTop: spacing.margin.small }]}>{"Xem diễn giải chiêm tinh của bạn\nvà người bạn quan tâm"}</Text>
        </View>
        <LinearGradient colors={['#C7D0D8BF', '#254668BF']} style={styles.profile}>
            {/* <View style={styles.profile}> */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView contentContainerStyle={{ paddingTop: spacing.margin.bigx2, paddingBottom: spacing.margin.bigx2 * 2 }}>
                    <DropDownButton
                        title="Chọn người muốn xem"
                        styleContainer={{ paddingHorizontal: spacing.padding.large}}
                        styleTitle={[TypeStyles.title, { color: Colors.white }]}
                        placeholder="Select here" onPress={() => { }} />
                    <View style={{ paddingHorizontal: spacing.padding.large, paddingTop: spacing.margin.big }}>
                        <Text style={[TypeStyles.title, { color: Colors.white }]}>{"Hoặc xem cho người khác nữa!"}</Text>
                    </View>
                    <CustomInput placeholder="Tên/Biệt danh*" name="Tên/Biệt danh*" text={""} onChangeText={(text) => { }} />
                    <CustomInput placeholder="Ngày sinh*" name="Ngày sinh*" text={""} onChangeText={(text) => { }} />
                    <CustomInput placeholder="Giờ sinh*" name="Giờ sinh*" text={""} onChangeText={(text) => { }} />
                    <CustomInput placeholder="Nơi sinh*" name="Nơi sinh*" text={""} onChangeText={(text) => { }} />
                    <CustomInput placeholder="Loại mối quan hệ*" name="Loại mối quan hệ*" text={""} onChangeText={(text) => { }} />
                    <CustomButton container={styles.btnConfirm} text={styles.btnText} title="Xong rồi" onPress={() => {
                        if (isEnabled) {
                        } else {
                            Alert.alert('Hi!', "Please fill in your information!");
                        }
                    }} />
                </ScrollView>
                {/* </View> */}
            </KeyboardAvoidingView>
        </LinearGradient>
    </ImageBackground>
}

const styles = StyleSheet.create({
    info: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.padding.large
    },
    profile: {
        // backgroundColor: "#827EAB59",
        flex: 1,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
    },
    btnText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        color: Colors.white
    },
    btnConfirm: {
        opacity: 1,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.32,
        shadowRadius: 4,
        elevation: 5,
        marginTop: spacing.margin.big,
        paddingHorizontal: 80
    },
});