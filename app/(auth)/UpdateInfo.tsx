import Colors from "@/styles/Colors";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from 'expo-image';
import { LinearGradient } from "expo-linear-gradient";
import Input from "@/components/Input";
import InfoButton from "@/components/InfoButton";
import CustomButton from "@/components/CustomButton";
import SelectBirthday from "@/components/SelectBirthday";
import SelectTimeOfBirth from "@/components/SelectTimeOfBirth";
import PopupBottomSheet, { CanShowBottomSheet } from "@/components/PopupBottomSheet";
import ChooseValue from "@/components/auth/ChooseValue";
import { useMutation } from "@apollo/client";
import { UPDATE_ACCOUNT_INFO } from "@/apollo/mutation";
import useAuthStore from "@/stores/AuthStore";
import { AuthAction } from "@/stores/interfaces/IAuthState";
import strings from "@/localization";
import { getCalendars } from "expo-localization";
import { router } from "expo-router";
const { width } = Dimensions.get('screen');
const SIZE_SUN = width - 100;

export default function UpdateInfoScreen() {
    const genders = [
        { label: strings.t("male"), value: 'Male' },
        { label: strings.t("female"), value: 'Female' },
        { label: strings.t("other"), value: 'Other' },
    ];
    const replationships = [
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
    const actions = useAuthStore(state => state.actions);
    const user = useAuthStore(state => state.user);
    const birthDayRef = React.useRef<string>("");
    const timeRef = React.useRef<string>("");
    const [isEnabled, setIsEnabled] = useState(false);
    const { calendar, timeZone, uses24hourClock, firstWeekday } = getCalendars()[0];
    const [UpdateAccountInfo, { data, loading, error }] =
        useMutation(UPDATE_ACCOUNT_INFO);

    useEffect(() => {
    }, []);

    useEffect(() => {
        if (user?.display_name && user?.relationships && user.birthday && user.gender && user.timezone) {
            setIsEnabled(true);
        } else {
            setIsEnabled(false);
        }
    }, [user]);

    useEffect(() => {
        if (data?.updateAccount) {
            global.loadingRef.current?.hide();
            actions.setStatus(AuthAction.AUTH_HOME);
        } else if (loading) {
            global.loadingRef.current?.show();
        } else if (error) {
            global.loadingRef.current?.hide();
            console.log(`error ===`, error);
        }
    }, [data, loading, error]);

    const onPressContinue = useCallback(async () => {
        UpdateAccountInfo({
            variables: user,
        });
    }, [user]);

    const setUserInfo = useCallback((data: any) => {
        actions.setTmpUser({
            ...user,
            ...data
        });
    }, [user]);

    return <SafeAreaView edges={['top']} style={styles.container}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.icon}>
                <Image source={require('@/assets/images/ic_logo.png')} style={{ width: 88, height: 88 }} />
            </View>
            <LinearGradient
                colors={['#2D79E5', '#B2D1FD']}
                style={styles.body}
            >
                <ScrollView contentContainerStyle={{ paddingBottom: SIZE_SUN * 0.6 }} style={{ flex: 1 }}>
                    <View style={{ transform: [{ scaleX: 1 / 1.3 }] }}>
                        <Text style={styles.title}>{"Please fill in\nyour Information!"}</Text>
                        <Input placeholder="Name/Nickname*" name="Name/Nickname*" text={user?.display_name || ""} onChangeText={(text) => setUserInfo({ display_name: text })} />
                        <SelectBirthday onSelectedDate={(date) => {
                            birthDayRef.current = date;
                            setUserInfo({ birthday: `${date} ${timeRef.current}` })
                        }} />
                        <SelectTimeOfBirth onSelectedTime={(time) => {
                            timeRef.current = time;
                            setUserInfo({ birthday: `${birthDayRef.current} ${time}` })
                        }} />
                        <InfoButton name="Gender*" placeholder="Gender*" text={user?.gender || ""} onPress={() => {
                            popupBottomSheetRef.current?.show();
                        }} />
                        <InfoButton name="Play of birth*" placeholder="City, State, Nation*" text={user?.timezone || timeZone} onPress={() => {
                            router.push({
                                pathname: '/TimeZonesScreen',
                                params: {
                                    name: user?.timezone || timeZone
                                }
                            });
                        }} />
                    </View>
                    <View style={{ transform: [{ scaleX: 1 / 1.3 }], height: SIZE_SUN * 0.6 }}>
                        <Image tintColor={Colors.white} source={require('@/assets/images/bg_sun.png')} style={{ width: SIZE_SUN, height: SIZE_SUN * 762 / 676, position: 'absolute', right: 0 }} />
                        <ChooseValue data={replationships} onSelected={(text) => {
                            setUserInfo({ relationships: text });
                        }} text={user?.relationships || ""} title="i am:*" />
                        <CustomButton container={styles.btnConfirm} text={styles.btnText} title="LET'S SEE" onPress={() => {
                            if (isEnabled) {
                                onPressContinue();
                            } else {
                                Alert.alert('Hi!', "Please fill in your information!");
                            }
                        }} />
                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
        <PopupBottomSheet ref={popupBottomSheetRef}>
            <ChooseValue data={genders} onSelected={(text) => {
                setUserInfo({ gender: text });
            }} text={user?.gender || ""} title="Gender*" />
        </PopupBottomSheet>
    </SafeAreaView>;
}

const styles = StyleSheet.create({
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
        marginTop: 60,
        paddingHorizontal: 80
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 28,
        color: Colors.white,
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
});