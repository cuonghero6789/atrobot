import { UPDATE_LANGUAGE } from "@/apollo/mutation";
import ChooseValue from "@/components/auth/ChooseValue";
import CustomButton from "@/components/CustomButton";
import DropDownButton from "@/components/DropDownButton";
import PopupBottomSheet, { CanShowBottomSheet } from "@/components/PopupBottomSheet";
import Colors from "@/constants/Colors";
import { languages } from "@/data";
import useAccountStore from "@/stores/AccountStore";
import useAuthStore from "@/stores/AuthStore";
import { AuthAction } from "@/stores/interfaces/IAuthState";
import { useMutation } from "@apollo/client";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect } from "react";
import { memo } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
const { width, height } = Dimensions.get('window');
const aspectRatio = 318 / 48;
const WIDTH_LOGO = width - 72;
const HEIGHT_LOGO = WIDTH_LOGO / aspectRatio;
function UpdateLang() {
    const insets = useSafeAreaInsets();
    const user = useAccountStore(state => state.user);
    const actionAuth = useAuthStore(state => state.actions);
    const [selectedLang, setSelectedLang] = React.useState("");
    const [selectedContentLang, setSelectedContentLang] = React.useState("");
    const popupBottomSheetRef = React.useRef<CanShowBottomSheet>(null);
    const popupBottomSheetContentRef = React.useRef<CanShowBottomSheet>(null);
    const [UpdateLanguage, { data, loading, error }] =
        useMutation(UPDATE_LANGUAGE);

    useEffect(() => {
        if (loading) {
            global.loadingRef.current?.show();
        } else if (data) {
            actionAuth.setStatus(AuthAction.AUTH_INFO);
        }
    }, [data, loading]);

    const onPressConfirm = useCallback(() => {
        if (selectedLang && selectedContentLang) {
            UpdateLanguage({ variables: { language_code: selectedLang, ai_language: selectedContentLang } });
        } else {
            alert("Please select language and content"), [{
                text: "OK", onPress: () => {

                }
            }];
        }
    }, [selectedLang, selectedContentLang]);

    return <LinearGradient
        colors={['#2D79E5', '#B2D1FD']}
        style={[styles.body, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
    >
        <ImageBackground source={require('@/assets/images/ic_el.png')} style={styles.container}>
            <View style={{ flex: 1, paddingVertical: 36 }}>
                <Image source={require('@/assets/images/ic_logo_banner.png')} style={{ width: WIDTH_LOGO, height: HEIGHT_LOGO, alignSelf: 'center' }} />
            </View>
            <View style={{ paddingHorizontal: 48 }}>
                <DropDownButton title="Ngôn ngữ ứng dụng*" onPress={() => popupBottomSheetRef.current?.show()} item={languages.find(item => item.value === selectedLang)} />
                <View style={{ height: 16 }} />
                <DropDownButton title="Ngôn ngữ hiện thị nội dung*" onPress={() => popupBottomSheetContentRef.current?.show()} item={languages.find(item => item.value === selectedContentLang)} />
                <CustomButton container={styles.btnConfirm} text={styles.btnText} title="Tiếp Tục" onPress={onPressConfirm} />
            </View>
            <PopupBottomSheet ref={popupBottomSheetRef}>
                <ChooseValue data={languages} onSelected={(text) => {
                    popupBottomSheetRef.current?.hide();
                    setSelectedLang(text);
                }} text={selectedLang} title="Language App*" />
            </PopupBottomSheet>
            <PopupBottomSheet ref={popupBottomSheetContentRef}>
                <ChooseValue data={languages} onSelected={(text) => {
                    popupBottomSheetContentRef.current?.hide();
                    setSelectedContentLang(text);
                }} text={selectedContentLang} title="Language Content*" />
            </PopupBottomSheet>
        </ImageBackground>
    </LinearGradient>

}

export default memo(UpdateLang);

const styles = StyleSheet.create({
    btnText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        color: Colors.white
    },
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
    btnConfirm: {
        opacity: 1,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.32,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 60,
        paddingHorizontal: 80
    },
});