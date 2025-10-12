import { LOGOUT, UPDATE_AI_LANGUAGE, UPDATE_APP_LANGUAGE } from "@/core/apollo/mutations";
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
import { Linking, ScrollView, Text, View, StyleSheet, Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { TAB_HEIGHT } from "./_layout";
import { BANNER_HEIGHT, BannerAdmob } from "@/components/ads/CustomAdmob";

export default function YouScreen() {
    const insent = useSafeAreaInsets();
    const [Logout, { data: dataLogout, loading: loadingLogout, error: errorLogout }] = useMutation(LOGOUT);
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

    // Cross-platform confirm dialog: use native Alert on mobile and window.confirm on web
    const confirmAction = useCallback((title: string, message: string, onConfirm: () => void) => {
        if (Platform.OS === 'web') {
            // window.confirm returns true for OK, false for Cancel
            const ok = window.confirm(`${title}\n\n${message}`);
            if (ok) onConfirm();
            return;
        }
        Alert.alert(
            title,
            message,
            [
                { text: strings.t("cancel"), style: 'cancel' },
                { text: strings.t("agree"), onPress: onConfirm },
            ],
            { cancelable: true },
        );
    }, []);

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

    return <ImageBackground source={require('@/assets/images/bg_manifest.png')} style={{ flex: 1, }}>
        {/* <LinearGradient colors={['#E3ECF7BF', '#6AA3EEBF']} style={styles.container}> */}
        <LinearGradient colors={['#C7D0D8BF', '#254668BF']} style={[styles.container, { paddingTop: insent.top }]}>

            <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: TAB_HEIGHT + 16 + BANNER_HEIGHT}}>
                {renderTitle()}
                <View style={styles.sectionCard}>
                    <Item text={strings.t("profile")}
                        onPress={() => {
                            router.push({
                                pathname: '/UpdateInfo',
                                params: {}
                            })
                        }} />
                </View>
                <View style={[styles.sectionCard, { marginTop: 16 }]}>
                    {renderLanguages()}
                </View>
                <View style={[styles.sectionCard, { marginTop: 16 }]}>
                    <Item text={strings.t("linkFacebook")} onPress={handlePress} />
                    <View style={{ height: 12 }} />
                    <Item text={strings.t("termOfService")} onPress={() => {
                        router.push({
                            pathname: '/WebScreen',
                            params: {
                                title: strings.t("termOfService"),
                                uri: getConfig().LINKS.PRIVACY,
                            },
                        })
                    }} />
                    <View style={{ height: 12 }} />
                    <Item text={strings.t("termOfPrivacy")} onPress={() => {
                        router.push({
                            pathname: '/WebScreen',
                            params: {
                                title: strings.t("termOfPrivacy"),
                                uri: getConfig().LINKS.TERMS,
                            },
                        })
                    }} />
                </View>
                <View style={[styles.sectionCard, { marginTop: 16 }]}>
                    <Item
                        text={strings.t("txtLogout")}
                        onPress={() => {
                            confirmAction(strings.t("hi"), strings.t("logout"), async () => {
                                const device_id = global.device_id;
                                Logout({ variables: { device_id } });
                                actionAuth.onLogout();
                            });
                        }}
                    />
                    <View style={{ height: 12 }} />
                    <Item
                        styleName={{ color: 'red' }}
                        text={strings.t("txtDeleteAccount")}
                        onPress={() => {
                            confirmAction(strings.t("hi"), strings.t("txtConfirmDeleteAccount"), async () => {
                                const device_id = global.device_id;
                                Logout({ variables: { device_id } });
                                actionAuth.onLogout();
                            });
                        }}
                    />
                </View>
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
                UpdateAILanguage({ variables: { ai_language: value } });
                setTimeout(() => {
                    actions.setAccount({ ...user, ai_language: value });
                }, 200);
                popupBottomSheetAiLangRef.current?.hide();
            }} text={user?.ai_language || languages[0].value} title={strings.t("contentLang")} />
        </PopupBottomSheet>
        <BannerAdmob />
    </ImageBackground>
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingVertical: 16,
    },
    sectionCard: {
        marginHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.45)'
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