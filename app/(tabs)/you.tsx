import { UPDATE_AI_LANGUAGE, UPDATE_APP_LANGUAGE } from "@/apollo/mutation";
import ChooseValue from "@/components/auth/ChooseValue";
import { BackButton, Button } from "@/components/Button";
import DropDownButton from "@/components/DropDownButton";
import InfoButton from "@/components/InfoButton";
import PopupBottomSheet, { CanShowBottomSheet } from "@/components/PopupBottomSheet";
import Item from "@/components/settings/Item";
import AppConfig from "@/core/AppConfig";
import strings from "@/localization";
import useAccountStore from "@/stores/AccountStore";
import useAuthStore from "@/stores/AuthStore";
import Colors from "@/styles/Colors";
import spacing, { padding } from "@/styles/spacing";
import TypeStyles from "@/styles/TypeStyle";
import { useMutation } from "@apollo/client";
import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { Linking, ScrollView, Text, View, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
        return <Text style={[TypeStyles.title, { marginHorizontal: 16, marginBottom: 8 }]}>{strings.t("settings")}</Text>;
    };

    useEffect(() => {
        if (data?.updateAccount) {
            //   Toast.show({
            //     type: 'success',
            //     text2: strings.updateSuccess,
            //   });
        }
    }, [data]);

    const renderLanguages = () => {
        return (
            <View style={{ padding: 16 }}>
                <Item text={strings.t("lang")} onPress={() => { }} />
                <View style={{ paddingTop: 16 }}>
                    <DropDownButton title="Ngôn ngữ ứng dụng*" onPress={() => popupBottomSheetLangRef.current?.show()} item={languages.find(item => item.value === user?.language_code)} />
                    <View style={{ height: 16 }} />
                    <DropDownButton title="Ngôn ngữ nội dung*" onPress={() => popupBottomSheetAiLangRef.current?.show()} item={languages.find(item => item.value === user?.ai_language)} />
                </View>
            </View>
        );
    };
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        // const supported = await Linking.canOpenURL(linkFb);

        // if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(linkFb);
        // } else {
        //   Alert.alert(`Don't know how to open this URL: ${linkFb}`);
        // }
    }, [linkFb]);

    return <ImageBackground source={require('@/assets/images/bg_manifest.png')} style={{ flex: 1, paddingTop: insent.top }}>
        <ScrollView style={styles.body}>
            {renderTitle()}
            {/* <InfoButton text={strings.t("profile")} onPress={() => { }} /> */}
            <Item text={strings.t("profile")}
                style={{ paddingHorizontal: 16 }}
                onPress={() => { }} />
            {/* <Item
                text={strings.t("profile")}
                onPress={() => {
                    // router.push({
                    //     pathname: 'ProfileScreen',
                    // });
                }}
            /> */}
            {renderLanguages()}
            {/* <Item
                text={strings.t("linkFacebook")}
                onPress={() => {
                    handlePress();
                }}
            /> */}
            <Item style={{ marginHorizontal: 16, marginBottom: 16 }} text={strings.t("linkFacebook")} onPress={() => {
                handlePress();
            }} />

            <Item style={{ marginHorizontal: 16, marginBottom: 16 }} text={strings.t("termOfService")} onPress={() => {
                router.push({
                    pathname: '/WebScreen',
                    params: {
                        title: strings.t("termOfService"),
                        uri: AppConfig.URL_PRIVACY,
                    },
                })
            }} />

            <Item style={{ marginHorizontal: 16, marginBottom: 16 }} text={strings.t("termOfService")} onPress={() => {
                router.push({
                    pathname: '/WebScreen',
                    params: {
                        title: strings.t("termOfPrivacy"),
                        uri: AppConfig.URL_TERM_OF_USE,
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
        <PopupBottomSheet ref={popupBottomSheetLangRef}>
            <ChooseValue data={languages} onSelected={(value) => {
                actions.setAccount({ ...user, language_code: value });
                UpdateAPPLanguage({ variables: { language_code: value } });
            }} text={user?.language_code || languages[0].value} title={strings.t("appLang")} />
        </PopupBottomSheet>
        <PopupBottomSheet ref={popupBottomSheetAiLangRef}>
            <ChooseValue data={languages} onSelected={(value) => {
                actions.setAccount({ ...user, ai_language: value });
                UpdateAILanguage({ variables: { ai_language: value } });
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
        color: Colors.white,
        marginVertical: 16,
    },
    container: {
        backgroundColor: Colors.bgColor2,
        flex: 1,
    },
});