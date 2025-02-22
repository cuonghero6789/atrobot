import { Stack } from "expo-router";
import { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Image, ImageBackground } from 'expo-image';
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import CustomButton from "@/components/CustomButton";
import { useRouter } from 'expo-router';
import useAuthStore from "@/stores/AuthStore";
import { AuthAction } from "@/stores/interfaces/IAuthState";
import FireBaseAuth from "@/core/firebase/FireBaseAuth";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "@/apollo/mutation";
import { getDeviceInfo } from "@/core/utils/DeviceInfoUtil";
import { ACCOUNT } from "@/apollo/query";
import { UserModel } from "@/models/UserModel";
import useAccountStore from "@/stores/AccountStore";
import Colors from "@/styles/Colors";
import strings from "@/localization";
import ConfigUtil from "@/core/utils/ConfigUtil";
import ChooseLanguage from "@/components/auth/ChooseLanguage";

export default function IndexScreen() {
    const router = useRouter();
    const status = useAuthStore(state => state.status);
    const actions = useAuthStore(state => state.actions);
    const actionsAccount = useAccountStore(state => state.actions);
    const user = useAuthStore(state => state.user);
    const userAccount = useAccountStore(state => state.user);
    const [onLogin, { data, loading, error }] = useMutation(LOGIN);

    const {
        data: dataAccount,
        loading: loadingAccount,
        error: errorAccount,
        refetch,
    } = useQuery(ACCOUNT);

    // useEffect(() => {
    //     setTimeout(() => {
    //         router.replace('/UpdateLang');
    //     }, 1000);
    // }, []);
    /**
     * udpate info data when user missing info
     */
    useEffect(() => {
        if (data) {
            if (status === AuthAction.AUTH_INFO) {
                router.replace('/UpdateInfo');
            } else if (status === AuthAction.AUTH_LANGUAGE) {
                router.replace('/UpdateLang');
            }
        }
    }, [status, data]);

    /**
     *  data when user call request login
     * token save to global 
     * save info login to auth action
     * refresh call request account info from BE
     *  */
    useEffect(() => {
        if (data) {
            global.token = data.login.token;
            actions.setAuthUser(data.login.user, data.login.token);
            global.loadingRef.current?.hide();
            refetch();
        }
    }, [data]);

    /**
     * call request account info from BE
     * check info input by user
     */
    useEffect(() => {
        if (dataAccount?.account && user) {
            const user: UserModel = dataAccount.account;
            actionsAccount.setAccount(user);
            if (
                user?.relationships &&
                user?.birthday &&
                user?.hometown &&
                user?.gender &&
                user?.ai_language
            ) {
                actions.setStatus(AuthAction.AUTH_HOME);
            } else {
                actions.setStatus(AuthAction.AUTH_INFO);
            }
        }
    }, [dataAccount, user]);

    const onGoogleLogin = useCallback(async () => {
        global.loadingRef.current?.show();
        const token = await FireBaseAuth.onGoogleLogin();
        if (!token) {
            global.loadingRef.current?.hide();
            return;
        }
        onLogin({ variables: { token: token, ...getDeviceInfo() } });
    }, []);

    const onAppleLogin = useCallback(async () => {
        const token = await FireBaseAuth.onAppleLogin();
        global.loadingRef.current?.hide();
        onLogin({ variables: { token: token, ...getDeviceInfo() } });
    }, []);

    const onFacebookLogin = useCallback(async () => {
        global.loadingRef.current?.show();
        const token = await FireBaseAuth.onFacebookLimitedLogin();
        if (!token) {
            global.loadingRef.current?.hide();
            return;
        }
        onLogin({ variables: { token: token, ...getDeviceInfo() } });
    }, []);

    const onPrivacy = useCallback(() => {
        router.push({
            pathname: '/WebScreen',
            params: {
                title: strings.t("termOfService"),
                uri: ConfigUtil.URL_PRIVACY,
            }
        });
    }, []);

    const onTerms = useCallback(() => {
        router.push({
            pathname: '/WebScreen',
            params: {
                title: strings.t("termOfPrivacy"),
                uri: ConfigUtil.URL_TERM_OF_USE,
            }
        });
    }, []);

    return <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.icon}>
            <Image source={require('@/assets/images/ic_logo.png')} style={{ width: 88, height: 88 }} />
        </View>
        <ImageBackground source={require('@/assets/images/bg_login.png')} style={{ flex: 1, justifyContent: 'center' }}>
            <ImageBackground source={require('@/assets/images/bg_astr.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1 }} />
                    <View style={{ paddingHorizontal: 48, flex: 1 }}>
                        <Button containerStyle={{ marginBottom: 16 }} title={strings.t("continueGoogle")} onPress={onGoogleLogin} />
                        <Button containerStyle={{ marginBottom: 16 }} title={strings.t("continueFacebook")} onPress={onFacebookLogin} />
                        <CustomButton title={strings.t("continueApple")} onPress={onAppleLogin} />
                    </View>
                    <View style={styles.footer}>
                        <ChooseLanguage />
                        <Text style={styles.text}>
                            {strings.t("bycontinue")}
                            <Text
                                onPress={() => {
                                    onTerms();
                                }}
                                style={{ textDecorationLine: 'underline' }}>
                                {strings.t("termOfService")}
                            </Text>
                            {strings.t("acknowledge")}
                            <Text
                                onPress={() => {
                                    onPrivacy();
                                }}
                                style={{ textDecorationLine: 'underline' }}>
                                {strings.t("termOfPrivacy")}
                            </Text>
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </ImageBackground>
    </SafeAreaView>;
}

const styles = StyleSheet.create({
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        borderTopLeftRadius: 300,
        borderTopRightRadius: 300,
    },
    container: {
        flex: 1,
    },
    footer: {
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 32
    },
    text: {
        color: Colors.black,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 21,
    },
    title: {
        fontSize: 20,
        color: Colors.white,
        textAlign: 'center',
        marginTop: 60,
    },
});