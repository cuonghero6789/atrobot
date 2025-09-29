import { BackButton, ButtonIcon } from "@/components/Button";
import { CardView } from "@/components/Card";
import { Distribution, InfoChartProperties } from "@/components/personal/distribution";
import { colors, fontSize, spacing, textStyle } from "@/core/styles";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Href, useRouter } from "expo-router";
import { memo, useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDailyStore, usePlanetStore, useSubjectStore, useYouStore } from "@/core/stores";
import { ASTROME_MANIFEST } from "@/core";
import strings from '@/core/localization';
import ElementDistribution from "@/components/personal/ElementDistribution";
import QualityDistribution from "@/components/personal/QualityDistribution";
import LoadingLuna from "@/components/loading/LoadingLuna";

function PersonalScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { actions: actionSubject, subject } = useSubjectStore(state => state);
    const { dominant, actions: actionYou } = useYouStore(state => state);
    const weekly = useDailyStore(state => state.weekly?.weekly);

    const openWeekly = (key: string, fallbackTitle: string) => {
        const item = weekly?.find?.((it: any) => it?.key === key);
        if (!item) return;
        router.push({
            pathname: "/WeeklyDetail",
            params: {
                title: item?.label || fallbackTitle,
                content: item?.text || ''
            }
        } as unknown as Href);
    };

    useEffect(() => {
        actionYou.getCacheDominant();
    }, [actionYou]);

    return <ImageBackground source={require('@/assets/images/bg_home.png')} style={{ flex: 1, paddingTop: insets.top }}>
        <BackButton onPress={() => router.back()} title={strings.t('personal')} subTitle={strings.t('introHome')} />
        {
            subject?.element_distributions?.length ?
                <LinearGradient colors={['#DDE8F4BF', '#5E99E6BF']} style={styles.profile}>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.large, paddingBottom: spacing.big }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 16,
                            flex: 1
                        }}>
                            <ButtonIcon icon={require('@/assets/images/icons/ic_carier.png')} onPress={() => {
                                openWeekly('career', strings.t('daily_career'));
                            }} />
                            <ButtonIcon icon={require('@/assets/images/icons/ic_love.png')} onPress={() => {
                                openWeekly('love', strings.t('daily_love'));
                            }} />
                            <ButtonIcon icon={require('@/assets/images/icons/ic_suckhoe.png')} onPress={() => {
                                openWeekly('heath', strings.t('daily_heath'));
                            }} />
                            <ButtonIcon icon={require('@/assets/images/icons/ic_finance.png')} onPress={() => {
                                openWeekly('money', strings.t('daily_money'));
                            }} />
                            <ButtonIcon icon={require('@/assets/images/icons/ic_personal.png')} onPress={() => {
                                router.push("/PlanetsScreen", {
                                });
                            }} />
                        </View>
                        <Text style={[textStyle.textBold, { textAlign: 'center' }]}>{strings.t('yourPersonality')}</Text>
                        {
                            dominant?.personality &&
                            <CardView
                                contanerStyle={{
                                    paddingVertical: spacing.extraLarge,
                                    marginHorizontal: spacing.large
                                }}
                                textStyleProp={[textStyle.bodyText2, {
                                    fontSize: 14
                                }]}
                                description={dominant?.personality}
                                style={{
                                    borderWidth: 0
                                }} />
                        }
                        {
                            subject?.element_distributions?.length &&
                            <ElementDistribution />
                        }
                        {
                            subject?.quality_distributions?.length &&
                            <QualityDistribution />
                        }
                        {/* <View style={styles.chartContainer}>
                        <RadarChart
                            data={radarData}
                            gridConfig={{
                                gradientColor: '#4C80B09C',
                            }}
                            polygonConfig={{
                                gradientColor: '#79B1D6',
                                stroke: '#92CDAB',
                                strokeWidth: 1
                            }}
                            hideLabels={true}
                            labelConfig={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                fontFamily: 'Montserrat-Bold',
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={textStyle.text}>{"Khép kín-Hướng nội:"}</Text>
                                <Text style={textStyle.text}>{"Hoạt động nhóm:"}</Text>
                                <Text style={textStyle.text}>{"Độc lập - phi nguyên tắc:"}</Text>
                                <Text style={textStyle.text}>{"Khó thay đổi:"}</Text>
                                <Text style={textStyle.text}>{"Hay thay đổi - chần chừ:"}</Text>
                                <Text style={textStyle.text}>{"Mạo hiểm:"}</Text>
                            </View>
                            <View style={{ paddingLeft: 16 }}>
                                <Text style={[textStyle.textBold, { color: colors.black }]}>{"30.5/100"}</Text>
                                <Text style={[textStyle.textBold, { color: colors.black }]}>{"6.5/100"}</Text>
                                <Text style={[textStyle.textBold, { color: colors.black }]}>{"16.5/100"}</Text>
                                <Text style={[textStyle.textBold, { color: colors.black }]}>{"8.5/100"}</Text>
                                <Text style={[textStyle.textBold, { color: colors.black }]}>{"7.5/100"}</Text>
                                <Text style={[textStyle.textBold, { color: colors.black }]}>{"15/100"}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.chartContainer}>
                        <Text style={[textStyle.textBold, { marginBottom: 16 }]}>{"Dự đoán xu hướng tài chính"}</Text>
                        <LineChart
                            data={lineData}
                            height={200}
                            width={width - 64}
                            spacing={50}
                            rulesLength={5}
                            rulesColor="black"
                            rulesType="dashed"
                            xAxisType="dashed"
                            color="#3589E9"
                            thickness={6}
                            startFillColor="rgba(54, 137, 233, 0.2)"
                            endFillColor="rgba(54, 137, 233, 0.0)"
                            initialSpacing={0}
                            endSpacing={0}
                            noOfSections={4}
                            yAxisTextStyle={{ color: 'white' }}
                            hideDataPoints
                            curved
                        />
                    </View> */}
                    </ScrollView>
                </LinearGradient>
                : <LoadingLuna />
        }

    </ImageBackground>
}

export default memo(PersonalScreen);

const styles = StyleSheet.create({
    profile: {
        flex: 1,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
    },
    labelContainer: {
        width: 32,
        height: 32,
        backgroundColor: 'white',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    labelIcon: {
        width: 20,
        height: 20,
    },
    chartContainer: {
        alignItems: 'center',
        marginVertical: spacing.large,
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: spacing.large,
        borderRadius: 16,
    },
    radarChart: {
        marginTop: spacing.large,
    },
});