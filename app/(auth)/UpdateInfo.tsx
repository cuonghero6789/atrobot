import Colors from "@/constants/Colors";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ImageBackground } from 'expo-image';
import { LinearGradient } from "expo-linear-gradient";
import Input from "@/components/Input";
import InfoButton from "@/components/InfoButton";
import ChooseRelationship from "@/components/auth/ChooseRelationship";
import ConfirmButton from "@/components/ConfirmButton";
import CustomButton from "@/components/CustomButton";
import SelectBirthday from "@/components/SelectBirthday";
import SelectTimeOfBirth from "@/components/SelectTimeOfBirth";
const { width } = Dimensions.get('screen');
const SIZE_SUN = width - 100;

export default function UpdateInfoScreen() {
    useEffect(() => {
        // alert("cuonghero login");
        // router.replace('/auth/login');
    }, []);

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
                        <Input placeholder="Name/Nickname*" name="Name/Nickname*" text={""} />
                        <SelectBirthday />
                        <SelectTimeOfBirth />
                        <InfoButton name="Play of birth*" placeholder="City,  State, Nation*" text="" onPress={() => { }} />
                    </View>
                    <View style={{ transform: [{ scaleX: 1 / 1.3 }], height: SIZE_SUN * 0.6 }}>
                        <Image tintColor={Colors.white} source={require('@/assets/images/bg_sun.png')} style={{ width: SIZE_SUN, height: SIZE_SUN * 762 / 676, position: 'absolute', right: 0 }} />
                        <ChooseRelationship />
                        <CustomButton container={styles.btnConfirm} text={styles.btnText} title="LET'S SEE" onPress={() => { }} />
                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
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