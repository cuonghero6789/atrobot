import ChooseValue from "@/components/auth/ChooseValue";
import CustomButton from "@/components/CustomButton";
import DropDownButton from "@/components/DropDownButton";
import InfoButton from "@/components/InfoButton";
import { CustomInput } from "@/components/Input";
import PopupBottomSheet, { CanShowBottomSheet } from "@/components/PopupBottomSheet";
import SelectBirthday from "@/components/SelectBirthday";
import SelectTimeOfBirth from "@/components/SelectTimeOfBirth";
import { genders, replationships } from "@/core/data";
import { colors, spacing, textStyle } from "@/core/styles";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import strings from "@/core/localization";
import React from "react";
import { StyleSheet, View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccountStore } from "@/core/stores";

export default function StarMatesScreen() {
    const insets = useSafeAreaInsets();
    const userAccount = useAccountStore(state => state.user);
    const [isEnabled, setIsEnabled] = React.useState(false);
    const popupBottomSheetRef = React.useRef<CanShowBottomSheet>(null);
    const [selectedPerson, setSelectedPerson] = React.useState<string>("");
    const [selectName, setSelectName] = React.useState<string>("");
    const [selectBirthday, setSelectBirthday] = React.useState<string>("");
    const [selectTimeOfBirth, setSelectTimeOfBirth] = React.useState<string>("");
    const [selectGender, setSelectGender] = React.useState<string>("");
    const [selectRelationship, setSelectRelationship] = React.useState<string>("");

    return <ImageBackground source={require('@/assets/images/bg_home.png')} style={{ flex: 1 }}>
        <ImageBackground source={require('@/assets/images/bg_sun.png')} tintColor={'#FFFFFF75'} style={{ width: 338, height: 338, position: 'absolute', right: 0, top: 0 }} />
        <View style={[styles.info, { paddingTop: insets.top }]}>
            <Text style={[textStyle.title, { color: colors.black3 }]}>{"StarMates"}</Text>
            <Text style={[textStyle.bodyText1, { color: colors.gray, textAlign: "center", marginTop: spacing.sm }]}>{strings.t("starMates")}</Text>
        </View>
        <LinearGradient colors={['#C7D0D8BF', '#254668BF']} style={styles.profile}>
            {/* <View style={styles.profile}> */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView contentContainerStyle={[{ paddingTop: spacing.bigx2, paddingBottom: spacing.bigx2 * 2 }]}>
                    <DropDownButton
                        title={strings.t("choosePersonToView")}
                        styleContainer={{ paddingHorizontal: spacing.large }}
                        styleTitle={[textStyle.title, { color: colors.white }]}
                        placeholder={strings.t("selectHere")} onPress={() => { }} />
                    <View style={{ paddingHorizontal: spacing.large, paddingTop: spacing.big }}>
                        <Text style={[textStyle.title, { color: colors.white }]}>{strings.t("orViewForOthers")}</Text>
                    </View>
                    <CustomInput placeholder={strings.t("nameOrNickName")} name={strings.t("nameOrNickName")} text={selectName} onChangeText={(text) => { setSelectName(text) }} />
                    <SelectBirthday onSelectedDate={(date) => { setSelectBirthday(date) }} />
                    <SelectTimeOfBirth onSelectedTime={(time) => { setSelectTimeOfBirth(time) }} />
                    <InfoButton name={strings.t("gender")} placeholder={strings.t("gender")} text={selectGender} onPress={() => { popupBottomSheetRef.current?.show(); }} />
                    <ChooseValue data={replationships} onSelected={(text) => { setSelectRelationship(text) }} text={selectRelationship} title={strings.t("iAm")} />

                    <CustomButton container={styles.btnConfirm} text={styles.btnText} title={strings.t("done")} onPress={() => {
                        if (isEnabled) {
                        } else {
                            Alert.alert('Hi!', strings.t("pleaseFillInYourInformation"));
                        }
                    }} />
                </ScrollView>
                {/* </View> */}
            </KeyboardAvoidingView>
            <PopupBottomSheet ref={popupBottomSheetRef}>
                <ChooseValue data={genders} onSelected={(text) => { setSelectGender(text) }} text={selectGender} title="Gender*" />
            </PopupBottomSheet>
        </LinearGradient>
    </ImageBackground>
}

const styles = StyleSheet.create({
    info: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.large
    },
    profile: {
        // backgroundColor: "#827EAB59",
        flex: 1,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        overflow: 'hidden',
    },
    btnText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        color: colors.white
    },
    btnConfirm: {
        opacity: 1,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.32,
        shadowRadius: 4,
        elevation: 5,
        marginTop: spacing.big,
        paddingHorizontal: 80
    },
});