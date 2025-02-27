import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from '@apollo/client';
// import Toast from 'react-native-toast-message';
import Colors from '@/styles/Colors';
import strings from '@/localization';
import useAccountStore from '@/stores/AccountStore';
import { UPDATE_AI_LANGUAGE, UPDATE_APP_LANGUAGE } from '@/apollo/mutation';
import useAuthStore from '@/stores/AuthStore';
import Item from '@/components/settings/Item';
import { BackButton } from '@/components/Button';
import { useRouter } from 'expo-router';
import AppConfig from '@/core/AppConfig';
import PopupBottomSheet, { CanShowBottomSheet } from '@/components/PopupBottomSheet';
import ChooseValue from '@/components/auth/ChooseValue';
function SettingScreen({ navigation }: any): JSX.Element {
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
        return <Text style={styles.title}>{strings.t("settings")}</Text>;
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
            <View style={{ paddingBottom: 16 }}>
                <Item text={strings.t("lang")} onPress={() => { }} />
                <View>
                    <PopupBottomSheet ref={popupBottomSheetLangRef}>
                        <ChooseValue data={languages} onSelected={(value) => {
                            actions.setAccount({ ...user, language_code: value });
                            UpdateAPPLanguage({ variables: { language_code: value } });
                        }} text={user?.language_code || languages[0].value} title={strings.t("appLang")} />
                    </PopupBottomSheet>
                    <View style={{ height: 16 }} />
                    <PopupBottomSheet ref={popupBottomSheetAiLangRef}>
                        <ChooseValue data={languages} onSelected={(value) => {
                            actions.setAccount({ ...user, ai_language: value });
                            UpdateAILanguage({ variables: { ai_language: value } });
                        }} text={user?.ai_language || languages[0].value} title={strings.t("contentLang")} />
                    </PopupBottomSheet>
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

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <BackButton onPress={() => router.back()} />
            <ScrollView style={styles.body}>
                {renderTitle()}
                <Item
                    text={strings.t("profile")}
                    onPress={() => {
                        navigation.navigate('ProfileScreen');
                    }}
                />
                {renderLanguages()}
                <Item
                    text={strings.t("linkFacebook")}
                    onPress={() => {
                        handlePress();
                    }}
                />
                <Item
                    text={strings.t("termOfService")}
                    onPress={() => {
                        navigation.navigate('WebScreen', {
                            title: strings.t("termOfService"),
                            uri: AppConfig.URL_PRIVACY,
                        });
                    }}
                />
                <Item
                    text={strings.t("termOfPrivacy")}
                    onPress={() => {
                        navigation.navigate('WebScreen', {
                            title: strings.t("termOfPrivacy"),
                            uri: AppConfig.URL_TERM_OF_USE,
                        });
                    }}
                />

                <Item
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
                    text={strings.t("txtDeleteAccount")}
                    style={{ text: { color: 'red' } }}
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
        </SafeAreaView>
    );
}

export default SettingScreen;

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.bgColor2,
        flex: 1,
        padding: 16,
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
