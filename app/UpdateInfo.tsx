import { colors } from "@/core/styles";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from 'expo-image';
import { LinearGradient } from "expo-linear-gradient";
import { CustomInput } from "@/components/Input";
import InfoButton from "@/components/InfoButton";
import CustomButton from "@/components/CustomButton";
import SelectBirthday from "@/components/SelectBirthday";
import SelectTimeOfBirth from "@/components/SelectTimeOfBirth";
import PopupBottomSheet, { CanShowBottomSheet } from "@/components/PopupBottomSheet";
import ChooseValue from "@/components/auth/ChooseValue";
import { useMutation } from "@apollo/client";
import { UPDATE_ACCOUNT_INFO, UPLOAD_AVATAR } from "@/core/apollo/mutations";
import { useAuthStore } from "@/core/stores";
import { AuthAction } from "@/core/stores/interfaces/common/IAuthState";
import strings from "@/core/localization";
import { getCalendars } from "expo-localization";
import { useRouter } from "expo-router";
import { BackButton } from "@/components/Button";
import moment from "moment";
import { useAccountStore } from "@/core/stores";
import Toast from "react-native-toast-message";
import { UserModel } from "@/core";
import { ChooseAvatar } from "@/components/auth/ChooseAvatar";
import EditAvatar from "@/components/settings/EditAvatar";
const { width } = Dimensions.get('screen');
const SIZE_SUN = width - 100;

export default function UpdateInfoScreen() {
    const GENDERS = [
        { label: strings.t("male"), value: 'Male' },
        { label: strings.t("female"), value: 'Female' },
        { label: strings.t("other"), value: 'Other' },
    ];
    const RELATIONSHIPS = [
        {
            label: strings.t("singleAndLookingForLove"),
            value: 'Single and looking for love',
        },
        {
            label: strings.t("singleAndHappyWithIt"),
            value: 'Single and totally happy with it',
        },
        { label: strings.t("inRelationship"), value: 'In a relationship' },
    ];

    const popupBottomSheetRef = React.useRef<CanShowBottomSheet>(null);
    const popupBottomSheetRefAvatar = React.useRef<CanShowBottomSheet>(null);
    const actions = useAuthStore(state => state.actions);
    const actionsAccount = useAccountStore(state => state.actions);
    const user = useAccountStore(state => state.user);
    const userTmp = useAccountStore(state => state.userTmp);
    const status = useAuthStore(state => state.status);
    const router = useRouter();
    const { calendar, timeZone, uses24hourClock, firstWeekday } = getCalendars()[0];

    const [birthday, setBirthday] = useState<string>(user?.birthday ? moment(user?.birthday).format('YYYY-MM-DD') : "");
    const [timeOfBirth, setTimeOfBirth] = useState<string>(user?.birthday ? moment(user?.birthday).format('HH:mm') : "");
    const [displayName, setDisplayName] = useState<string>(user?.display_name || "");
    const [timezone, setTimezone] = useState<string>(userTmp?.timezone || user?.timezone || timeZone || "");
    const [gender, setGender] = useState<string>(user?.gender || "");
    const [relationships, setRelationships] = useState<string>(user?.relationships || "");
    const [avatar, setAvatar] = useState<string>(user?.avatar || "");

    const [
        UpdateAvatar,
        {
            data: dataUploadAvatar,
            loading: loadingUploadAvatar,
            error: errorUploadAvatar,
        },
    ] = useMutation(UPLOAD_AVATAR);

    useEffect(() => {
        if (dataUploadAvatar) {
            Toast.show({
                text1: strings.t("updateInfoSuccessAvatar"),
                type: "success",
                position: "bottom"
            });
        }
    }, [dataUploadAvatar]);

    useEffect(() => {
        if (errorUploadAvatar) {
            Toast.show({
                text1: errorUploadAvatar.message,
                type: "success",
                position: "bottom"
            });
            console.log(`errorUploadAvatar ===`, JSON.stringify(errorUploadAvatar));

        }
    }, [errorUploadAvatar]);

    useEffect(() => {
        if (userTmp?.timezone) {
            setTimezone(userTmp?.timezone);
        }
    }, [userTmp?.timezone]);

    const [UpdateAccountInfo, { data, loading, error }] =
        useMutation(UPDATE_ACCOUNT_INFO);

    useEffect(() => {
        if (data?.updateAccount) {
            global.loadingRef.current?.hide();
            Toast.show({
                text1: strings.t("updateInfoSuccess"),
                type: "success",
                position: "bottom"
            });
            if (status === AuthAction.AUTH_HOME) {
                router.back();
            } else {
                actions.setStatus(AuthAction.AUTH_HOME);
            }
        } else if (loading) {
            global.loadingRef.current?.show();
        } else if (error) {
            global.loadingRef.current?.hide();
            console.log(`error ===`, error);
        }
    }, [data, loading, error]);

    const onPressContinue = useCallback(async () => {
        if (displayName && relationships && birthday && gender && timezone && timeOfBirth) {
            const variables: UserModel = {
                display_name: displayName,
                relationships,
                birthday: `${birthday} ${timeOfBirth}`,
                hometown: "",
                gender,
                timezone
            }
            actionsAccount.setAccount(variables);
            UpdateAccountInfo({
                variables
            });
        } else {
            Alert.alert(strings.t("pleaseFillInYourInformation"));
        }
    }, [birthday, timeOfBirth, timezone, displayName, gender, relationships]);

    return <SafeAreaView edges={['top']} style={styles.container}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.icon}>
                <BackButton onPress={() => router.back()} containerStyle={{ position: 'absolute', top: 0, left: 0 }} />
                <Image source={require('@/assets/images/ic_logo.png')} style={{ width: 88, height: 88 }} />
            </View>
            <LinearGradient
                colors={['#2D79E5', '#B2D1FD']}
                style={styles.body}
            >
                <ScrollView contentContainerStyle={{ paddingBottom: SIZE_SUN * 0.6 }} style={{ flex: 1 }}>
                    <View style={{ transform: [{ scaleX: 1 / 1.3 }] }}>
                        <Text style={styles.title}>{strings.t("updateInfo")}</Text>
                        {
                            status === AuthAction.AUTH_HOME &&
                            <EditAvatar avatar={avatar} onPress={() => {
                                popupBottomSheetRefAvatar.current?.show();
                            }} />
                        }
                        <CustomInput placeholder={strings.t("nameOrNickName")}
                            name={strings.t("nameOrNickName")}
                            text={displayName}
                            onChangeText={(text) => setDisplayName(text)} />
                        <SelectBirthday birthday={birthday} onSelectedDate={(date) => {
                            setBirthday(date);
                        }} />
                        <SelectTimeOfBirth birthday={user?.birthday} onSelectedTime={(time) => {
                            setTimeOfBirth(time);
                        }} />
                        <InfoButton name={strings.t("gender")} placeholder={strings.t("gender")} text={gender || ""} onPress={() => {
                            popupBottomSheetRef.current?.show();
                        }} />
                        <InfoButton name={strings.t("placeOfBirth")}
                            placeholder={strings.t("placeOfBirth")}
                            text={timezone} onPress={() => {
                                router.push({
                                    pathname: '/TimeZonesScreen',
                                    params: {
                                        name: timezone
                                    }
                                });
                            }} />
                    </View>
                    <View style={{ transform: [{ scaleX: 1 / 1.3 }], height: SIZE_SUN * 0.6 }}>
                        <Image tintColor={colors.white} source={require('@/assets/images/bg_sun.png')}
                            style={{ width: SIZE_SUN, height: SIZE_SUN * 762 / 676, position: 'absolute', right: 0 }} />
                        <ChooseValue data={RELATIONSHIPS}
                            onSelected={(text) => {
                                setRelationships(text);
                            }} text={relationships || ""} title={strings.t("iAm")} />
                        <CustomButton container={styles.btnConfirm}
                            text={styles.btnText} title={strings.t("continue")}
                            onPress={() => {
                                onPressContinue();
                            }} />
                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
        <PopupBottomSheet ref={popupBottomSheetRef}>
            <ChooseValue data={GENDERS} onSelected={(text) => {
                setGender(text);
            }} text={gender || ""} title={strings.t("gender")} />
        </PopupBottomSheet>
        <PopupBottomSheet ref={popupBottomSheetRefAvatar}>
            <ChooseAvatar onImageSelected={(uri, base64, fileName, type) => {
                if (uri) {
                    setAvatar(uri);
                    const _file = new File([uri], fileName, { type, lastModified: Date.now() });
                    actionsAccount.setAccount({ ...user, avatar: uri });
                    UpdateAvatar({ variables: { file: _file, base64 } });
                }
                popupBottomSheetRefAvatar.current?.hide();
            }} />
        </PopupBottomSheet>
    </SafeAreaView>;
}

const styles = StyleSheet.create({
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
        marginTop: 60,
        paddingHorizontal: 80
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 28,
        color: colors.white,
        textAlign: 'center',
        marginTop: 60,
        marginBottom: 20
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        borderTopLeftRadius: 300,
        borderTopRightRadius: 300,
        transform: [{ scaleX: 1.3 }],
    },
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    footer: {
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 32
    },
    text: {
        color: colors.black,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 21,
    },
});