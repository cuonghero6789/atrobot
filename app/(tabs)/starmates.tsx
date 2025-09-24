import ChooseValue, { ChooseListStarmates } from "@/components/auth/ChooseValue";
import CustomButton from "@/components/CustomButton";
import DropDownButton from "@/components/DropDownButton";
import InfoButton from "@/components/InfoButton";
import { CustomInput } from "@/components/Input";
import PopupBottomSheet, { CanShowBottomSheet } from "@/components/PopupBottomSheet";
import SelectBirthday from "@/components/SelectBirthday";
import SelectTimeOfBirth from "@/components/SelectTimeOfBirth";
import { genders } from "@/core/data";
import { colors, spacing, textStyle } from "@/core/styles";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import strings from "@/core/localization";
import React, { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccountStore, useStarMatesStore } from "@/core/stores";
import { ASTRO_STAR_MATES } from "@/core/apollo/mutations/atro";
import { useMutation } from "@apollo/client";
import { starmates } from "@/core/data/common";
import { router } from "expo-router";

export default function StarMatesScreen() {
    const insets = useSafeAreaInsets();
    const userAccount = useAccountStore(state => state.user);
    const actionStarMates = useStarMatesStore(state => state.actions);
    const [isEnabled, setIsEnabled] = React.useState(false);
    const popupBottomSheetRef = React.useRef<CanShowBottomSheet>(null);
    const historySheetRef = React.useRef<CanShowBottomSheet>(null);
    const [selectedPerson, setSelectedPerson] = React.useState<string>("");
    const [selectName, setSelectName] = React.useState<string>("");
    const [selectBirthday, setSelectBirthday] = React.useState<string>("");
    const [selectTimeOfBirth, setSelectTimeOfBirth] = React.useState<string>("");
    const [selectGender, setSelectGender] = React.useState<string>("");
    const [selectRelationship, setSelectRelationship] = React.useState<string>("");
    const [AstroCustom, { data: dataCustom, loading: loadingCustom, error: errorCustom }] =
        useMutation(ASTRO_STAR_MATES);
    const listUserHistory = useStarMatesStore(state => state.listUserHistory) || [];

    useEffect(() => {
        actionStarMates.getListUserHistory();
    }, []);

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
                        item={selectedPerson ? { label: selectedPerson, value: selectedPerson } : undefined}
                        placeholder={strings.t("selectHere")} onPress={() => {
                            actionStarMates.getListUserHistory();
                            historySheetRef.current?.show();
                         }} />
                    <View style={{ paddingHorizontal: spacing.large, paddingTop: spacing.big }}>
                        <Text style={[textStyle.title, { color: colors.white }]}>{strings.t("orViewForOthers")}</Text>
                    </View>
                    <CustomInput placeholder={strings.t("nameOrNickName")} name={strings.t("nameOrNickName")} text={selectName} onChangeText={(text) => { setSelectName(text) }} />
                    <SelectBirthday birthday={selectBirthday} onSelectedDate={(date) => {
                         setSelectBirthday(date) }} />
                    <SelectTimeOfBirth onSelectedTime={(time) => { setSelectTimeOfBirth(time) }} />
                    <InfoButton name={strings.t("gender")} placeholder={strings.t("gender")} text={selectGender} onPress={() => { popupBottomSheetRef.current?.show(); }} />
                    <ChooseListStarmates data={starmates} onSelected={(text) => { setSelectRelationship(text) }} text={selectRelationship} title={strings.t("chooseRelationshipStarmates")} />
                    <CustomButton container={styles.btnConfirm} text={styles.btnText} title={strings.t("done")} onPress={() => {
                        if (loadingCustom) {
                            return;
                        }
                        if (!selectName?.trim() || !selectBirthday || !selectTimeOfBirth || !selectGender || !selectRelationship) {
                            Alert.alert('Hi!', strings.t("pleaseFillInYourInformation"));
                            return;
                        }
                        actionStarMates.setUser({
                            display_name: selectName.trim(),
                            birthday: `${selectBirthday} ${selectTimeOfBirth}`,
                            gender: selectGender,
                            relationships: selectRelationship
                        })
                        actionStarMates.setIsLoading(true);
                        actionStarMates.setUserToHistory({
                            display_name: selectName.trim(),
                            birthday: `${selectBirthday} ${selectTimeOfBirth}`,
                            gender: selectGender,
                            relationships: selectRelationship
                        })
                        AstroCustom({
                            variables: {
                                action: "astro_starmates",
                                user_input: JSON.stringify({
                                    name: selectName.trim(),
                                    birthday: `${selectBirthday} ${selectTimeOfBirth}`,
                                    gender: selectGender,
                                    relationship: selectRelationship
                                })
                            }
                        }).catch(() => {
                            // Optionally handle error feedback
                        });
                        router.push({
                            pathname: "/StarMateDetail",
                        });
                    }} />
                </ScrollView>
                {/* </View> */}
            </KeyboardAvoidingView>
            <PopupBottomSheet ref={popupBottomSheetRef}>
                <ChooseValue data={genders} onSelected={(text) => { setSelectGender(text) }} text={selectGender} title="Gender*" />
            </PopupBottomSheet>
            <PopupBottomSheet ref={historySheetRef} snapPoints={["45%", "75%"]}>
                <View style={{ paddingHorizontal: spacing.large, paddingTop: spacing.large }}>
                    <Text style={[textStyle.title, { color: colors.surfaceCard }]}>{strings.t("choosePersonToView")}</Text>
                </View>
                <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.large, paddingBottom: spacing.extraLarge }}>
                    {listUserHistory.map((u, idx) => {
                        const name = u.display_name || u.user_name || "";
                        const birthday = u.birthday || "";
                        const [datePart, timePart] = birthday.split(" ");
                        const isSelected = selectedPerson && selectedPerson.trim().toLowerCase() === name.trim().toLowerCase();
                        return (
                            <TouchableOpacity
                                key={`history-${idx}`}
                                activeOpacity={0.85}
                                onPress={() => {
                                    setSelectName(name);
                                    setSelectedPerson(name);
                                    console.log('datePart ===> ', datePart);
                                    
                                    if (datePart) setSelectBirthday(datePart);
                                    if (timePart) setSelectTimeOfBirth(timePart);
                                    setSelectGender(u.gender || "");
                                    setSelectRelationship(u.relationships || "");
                                    actionStarMates.setUser(u);
                                    historySheetRef.current?.hide();
                                }}
                                style={[styles.history_item, isSelected && styles.history_item_selected]}
                            >
                                <TouchableOpacity
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        actionStarMates.removeUserFromHistory(u);
                                    }}
                                    style={{ position: 'absolute', right: 10, top: 10, padding: 6 }}
                                >
                                    <Text style={[textStyle.textBold3, { color: isSelected ? colors.white : colors.black3 }]}>✕</Text>
                                </TouchableOpacity>
                                {isSelected && (
                                    <View style={{ position: 'absolute', right: 34, top: 12 }}>
                                        <Text style={[textStyle.textBold3, { color: colors.white }]}>✓</Text>
                                    </View>
                                )}
                                <Text style={[textStyle.title, { color: isSelected ? colors.white : colors.black3 }]}>{name}</Text>
                                {!!birthday && <Text style={[textStyle.text, { color: isSelected ? '#FFFFFFCC' : colors.black4, marginTop: 4 }]}>{birthday}</Text>}
                                <View style={{ flexDirection: 'row', gap: 12, marginTop: 6 }}>
                                    {!!u.gender && <Text style={[textStyle.text, { color: isSelected ? '#FFFFFFCC' : colors.black4 }]}>{u.gender}</Text>}
                                    {!!u.relationships && <Text style={[textStyle.text, { color: isSelected ? '#FFFFFFCC' : colors.black4 }]}>{u.relationships}</Text>}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                    {(!listUserHistory || listUserHistory.length === 0) && (
                        <Text style={[textStyle.text, { color: colors.black4, marginTop: spacing.large }]}>{strings.t('noData') || 'No history yet'}</Text>
                    )}
                </ScrollView>
            </PopupBottomSheet>
        </LinearGradient>
    </ImageBackground>
}

const styles = StyleSheet.create({
    history_item:{
        backgroundColor: '#FFFFFFB3',
        borderRadius: 14,
        padding: spacing.md,
        marginTop: spacing.md,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4
    },
    history_item_selected:{
        backgroundColor: '#3A6AA3',
        borderColor: '#FFFFFF',
        borderWidth: 1
    },
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