import { UPDATE_AI_LANGUAGE, UPDATE_APP_LANGUAGE } from "@/core/apollo/mutations";
import ChooseValue from "@/components/auth/ChooseValue";
import DropDownButton from "@/components/DropDownButton";
import PopupBottomSheet, { CanShowBottomSheet } from "@/components/PopupBottomSheet";
import Item from "@/components/settings/Item";
import { getConfig } from "@/core";
import strings from "@/core/localization";
import { useAccountStore, useAuthStore } from "@/core/stores";
import { colors, textStyle } from "@/core/styles";
import { useMutation } from "@apollo/client";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { Linking, ScrollView, Text, View, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function YouScreen() {
    const insent = useSafeAreaInsets();
    const popupBottomSheetLangRef = React.useRef<CanShowBottomSheet>(null);
    const popupBottomSheetAiLangRef = React.useRef<CanShowBottomSheet>(null);
    const linkFb = "https://www.facebook.com/profile.php?id=61567195358592";
    const router = useRouter();
    const languages = [
        { label: strings.t("textVietName"), value: 'vi' },
        { label: strings.t("txtEnglish"), value: 'en' },
    ];
    const user = useAccountStore(state => state.user);
    const actions = useAccountStore(state => state.actions);
    const [UpdateAILanguage, { data, loading, error }] =
        useMutation(UPDATE_AI_LANGUAGE);
    const [
        UpdateAPPLanguage,
        { data: dataApp, loading: loadingApp, error: errorApp },
    ] = useMutation(UPDATE_APP_LANGUAGE);
    const actionAuth = useAuthStore(state => state.actions);

    const renderTitle = () => {
        return <Text style={[textStyle.title, { marginHorizontal: 16, marginBottom: 8 }]}>{strings.t("settings")}</Text>;
    };

    useEffect(() => {
        if (data?.updateAccount) {
              Toast.show({
                type: 'success',
                text2: strings.t("updateSuccess"),
                position: 'bottom',
                visibilityTime: 3000,
              });
        }
    }, [data, dataApp]);

    const renderLanguages = () => {
        return (
            <View style={{ padding: 16 }}>
                <View style={{ paddingTop: 16 }}>
                    <DropDownButton title={strings.t("appLang")} onPress={() => popupBottomSheetLangRef.current?.show()} item={languages.find(item => item.value === user?.language_code)} />
                    <View style={{ height: 16 }} />
                    <DropDownButton title={strings.t("contentLang")} onPress={() => popupBottomSheetAiLangRef.current?.show()} item={languages.find(item => item.value === user?.ai_language)} />
                </View>
            </View>
        );
    };
    const handlePress = useCallback(async () => {
        await Linking.openURL(linkFb);
    }, [linkFb]);

    return <ImageBackground source={require('@/assets/images/bg_manifest.png')} style={{ flex: 1, paddingTop: insent.top }}>
        <LinearGradient colors={['#C7D0D8BF', '#254668BF']} style={styles.container}>
            <ScrollView style={styles.body}>
                {renderTitle()}
                <Item text={strings.t("profile")}
                    style={{ paddingHorizontal: 16 }}
                    onPress={() => {
                        router.push({
                            pathname: '/UpdateInfo',
                            params: {

                            }
                        })
                    }} />
                {renderLanguages()}
                <Item style={{ marginHorizontal: 16, marginBottom: 16 }} text={strings.t("linkFacebook")} onPress={() => {
                    handlePress();
                }} />

                <Item style={{ marginHorizontal: 16, marginBottom: 16 }} text={strings.t("termOfService")} onPress={() => {
                    router.push({
                        pathname: '/WebScreen',
                        params: {
                            title: strings.t("termOfService"),
                            uri: getConfig().LINKS.PRIVACY,
                        },
                    })
                }} />
                    <Item style={{ marginHorizontal: 16, marginBottom: 16 }} text={strings.t("termOfPrivacy")} onPress={() => {
                    router.push({
                        pathname: '/WebScreen',
                        params: {
                            title: strings.t("termOfPrivacy"),
                            uri: getConfig().LINKS.TERMS,
                        },
                    })
                }} />
                <Item
                    style={{ marginHorizontal: 16, marginBottom: 16 }}
                    text={strings.t("txtLogout")}
                    onPress={() => {
                        Alert.alert(
                            strings.t("hi"),
                            strings.t("logout"),
                            [
                                {
                                    text: strings.t("cancel"),
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: strings.t("agree"),
                                    onPress: async () => {
                                        actionAuth.onLogout();
                                    },
                                },
                            ],
                            { cancelable: true },
                        );
                    }}
                />

                <Item
                    style={{ marginHorizontal: 16, marginBottom: 16 }}
                    styleName={{ color: 'red' }}
                    text={strings.t("txtDeleteAccount")}
                    onPress={() => {
                        Alert.alert(
                            strings.t("hi"),
                            strings.t("txtConfirmDeleteAccount"),
                            [
                                {
                                    text: strings.t("cancel"),
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: strings.t("agree"),
                                    onPress: async () => {
                                        actionAuth.onLogout();
                                    },
                                },
                            ],
                            { cancelable: true },
                        );
                    }}
                />
            </ScrollView>
        </LinearGradient>
        <PopupBottomSheet ref={popupBottomSheetLangRef}>
            <ChooseValue data={languages} onSelected={(value) => {
                actions.setAccount({ ...user, language_code: value });
                UpdateAPPLanguage({ variables: { language_code: value } });
                popupBottomSheetLangRef.current?.hide();
            }} text={user?.language_code || languages[0].value} title={strings.t("appLang")} />
        </PopupBottomSheet>
        <PopupBottomSheet ref={popupBottomSheetAiLangRef}>
            <ChooseValue data={languages} onSelected={(value) => {
                actions.setAccount({ ...user, ai_language: value });
                UpdateAILanguage({ variables: { ai_language: value } });
                popupBottomSheetAiLangRef.current?.hide();
            }} text={user?.ai_language || languages[0].value} title={strings.t("contentLang")} />
        </PopupBottomSheet>
    </ImageBackground>
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingVertical: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.white,
        marginVertical: 16,
    },
    container: {
        flex: 1,
    },
});