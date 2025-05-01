import { BackButton, ButtonIcon } from "@/components/Button";
import { CardView } from "@/components/Card";
import { Distribution, InfoChartProperties } from "@/components/personal/distribution";
import { PeriodSelector } from "../components/manifest/PeriodSelector";
import Colors from "@/styles/Colors";
import spacing from "@/styles/spacing";
import TypeStyles from "@/styles/TypeStyle";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { memo, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import {
    PieChart,
    PieChartPro,
    RadarChart
} from 'react-native-gifted-charts';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LineChart } from 'react-native-gifted-charts';
import { GET_SUBJECT } from "@/apollo/query";
import { useQuery } from "@apollo/client";
const { width } = Dimensions.get('window');
const SIZE = width / 3;

function PersonalScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { data: dataSubject, loading, error, refetch } = useQuery(GET_SUBJECT);

    const data = [
        { value: 50, color: '#90D3FF8F', text: 'Đất' }, // Earth
        { value: 20, color: '#3589E9EB', text: 'Nước' }, // Water
        { value: 10, color: '#8EB3CCBF', text: 'Lửa' }, // Fire
        { value: 22, color: '#3589E9EB', text: 'Khí' }, // Air
    ];

    const radarData = [50, 20, 10, 22, 35, 45];

    const lineData = [
        { value: 80 },
        { value: 40 },
        { value: -70 },
        { value: 40 },
        { value: 80 },
    ];

    return <ImageBackground source={require('@/assets/images/bg_home.png')} style={{ flex: 1, paddingTop: insets.top }}>
        <BackButton onPress={() => router.back()} />
        <LinearGradient colors={['#B9C3CEBF', '#032A51BF']} style={styles.profile}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.padding.large, paddingBottom: spacing.padding.big }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 16,
                    flex: 1
                }}>
                    <ButtonIcon icon={require('@/assets/images/icons/ic_carier.png')} onPress={() => { }} />
                    <ButtonIcon icon={require('@/assets/images/icons/ic_love.png')} onPress={() => { }} />
                    <ButtonIcon icon={require('@/assets/images/icons/ic_suckhoe.png')} onPress={() => { }} />
                    <ButtonIcon icon={require('@/assets/images/icons/ic_finance.png')} onPress={() => { }} />
                    <ButtonIcon icon={require('@/assets/images/icons/ic_personal.png')} onPress={() => { }} />
                </View>
                <Text style={[TypeStyles.textBold, { textAlign: 'center' }]}>{"Tính cách của bạn"}</Text>
                <CardView
                    contanerStyle={{
                        paddingVertical: spacing.padding.extraLarge,
                        marginHorizontal: spacing.margin.large
                    }}
                    textStyle={[TypeStyles.bodyText, {
                        fontSize: 12,
                        lineHeight: 19
                    }]}
                    description="Xử Nữ là biểu tượng của sự hoàn hảo, tỉ mỉ và logic. Trong công việc, bạn luôn chú trọng đến chi tiết nhỏ nhất và không ngại đối mặt với các nhiệm vụ phức tạp đòi hỏi sự cẩn thận. Điều này khiến bạn trở thành một chuyên gia đáng tin cậy trong mắt đồng nghiệp và cấp trên. Tuy nhiên, chính sự cầu toàn đôi khi khiến bạn cảm thấy áp lực và dễ mất động lực nếu mọi thứ không theo ý muốn. Với tính cách cẩn trọng, bạn thường thích các công việc có quy trình rõ ràng, yêu cầu tính tổ chức cao, và không để lại nhiều không gian cho sự hỗn loạn hoặc bất định.
Một điểm mạnh lớn của Xử Nữ là khả năng phân tích. Bạn có thể nhanh chóng tìm ra điểm mạnh và điểm yếu trong bất kỳ dự án nào, đồng thời đề xuất các giải pháp hợp lý. Chính điều này giúp bạn nổi bật trong các nhóm làm việc, đặc biệt là trong các vai trò liên quan đến quản lý dự án, kiểm "
                    style={{
                        borderWidth: 0
                    }} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={[TypeStyles.textBold, { textAlign: 'center', marginBottom: spacing.padding.big }]}>{"Phân bố Nguyên tố"}</Text>
                    <PieChartPro
                        donut
                        shadow
                        innerCircleBorderWidth={6}
                        showValuesAsLabels
                        showText
                        innerCircleBorderColor="transparent"
                        innerCircleColor="transparent"
                        textColor={Colors.black2}
                        textSize={12}
                        radius={SIZE}
                        font="Montserrat-Bold"
                        textBackgroundRadius={26}
                        data={data}
                    />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.padding.big, paddingVertical: spacing.padding.big }}>
                        <Distribution icon={require('@/assets/images/icons/ic_earth.svg')} title="Đất" description="50%" />
                        <Distribution icon={require('@/assets/images/icons/ic_water.svg')} title="Nước" description="20%" />
                        <Distribution icon={require('@/assets/images/icons/ic_fire.svg')} title="Lửa" description="10%" />
                        <Distribution icon={require('@/assets/images/icons/ic_air.svg')} title="Khí" description="22%" />
                    </View>
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={[TypeStyles.textBold2]}>{"Nguyên tố Trội: Khí"}</Text>
                    <Text style={[TypeStyles.subTitleMedium1, { color: Colors.black1 }]}>{"Airy souls, beware! Your mercurial nature may lead you down treacherous  paths of indecision and fickleness. While your intellect soars, your  emotions remain grounded, potentially leaving you disconnected from the  world around you. Your gift of communication could become a curse, as  words spoken in haste may return to haunt you. Beware of becoming lost  in the clouds of your own thoughts, lest you lose touch with reality and  those who matter most."}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={[TypeStyles.textBold, { textAlign: 'center', marginVertical: spacing.padding.big }]}>{"Phân bố Tính chất"}</Text>
                    <PieChartPro
                        donut
                        shadow
                        innerCircleBorderWidth={6}
                        showValuesAsLabels
                        showText
                        innerCircleBorderColor="transparent"
                        innerCircleColor="transparent"
                        textColor={Colors.black2}
                        textSize={12}
                        radius={SIZE}
                        font="Montserrat-Bold"
                        textBackgroundRadius={26}
                        data={data}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: spacing.margin.bigx2, paddingVertical: spacing.padding.big, justifyContent: 'space-between' }}>
                    <InfoChartProperties icon={require('@/assets/images/icons/ic_leading.png')} title="Đất" description="50%" />
                    <InfoChartProperties icon={require('@/assets/images/icons/ic_persisent.png')} title="Nước" description="20%" />
                    <InfoChartProperties icon={require('@/assets/images/icons/ic_flexible.png')} title="Lửa" description="10%" />
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={[TypeStyles.textBold2]}>{"Tính chất trội: Kiên định"}</Text>
                    <Text style={[TypeStyles.subTitleMedium1, { color: Colors.black1 }]}>{"Airy souls, beware! Your mercurial nature may lead you down treacherous  paths of indecision and fickleness. While your intellect soars, your  emotions remain grounded, potentially leaving you disconnected from the  world around you. Your gift of communication could become a curse, as  words spoken in haste may return to haunt you. Beware of becoming lost  in the clouds of your own thoughts, lest you lose touch with reality and  those who matter most."}</Text>
                </View>
                <View style={styles.chartContainer}>
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
                            <Text style={TypeStyles.text}>{"Khép kín-Hướng nội:"}</Text>
                            <Text style={TypeStyles.text}>{"Hoạt động nhóm:"}</Text>
                            <Text style={TypeStyles.text}>{"Độc lập - phi nguyên tắc:"}</Text>
                            <Text style={TypeStyles.text}>{"Khó thay đổi:"}</Text>
                            <Text style={TypeStyles.text}>{"Hay thay đổi - chần chừ:"}</Text>
                            <Text style={TypeStyles.text}>{"Mạo hiểm:"}</Text>
                        </View>
                        <View style={{ paddingLeft: 16 }}>
                            <Text style={[TypeStyles.textBold, { color: Colors.black }]}>{"30.5/100"}</Text>
                            <Text style={[TypeStyles.textBold, { color: Colors.black }]}>{"6.5/100"}</Text>
                            <Text style={[TypeStyles.textBold, { color: Colors.black }]}>{"16.5/100"}</Text>
                            <Text style={[TypeStyles.textBold, { color: Colors.black }]}>{"8.5/100"}</Text>
                            <Text style={[TypeStyles.textBold, { color: Colors.black }]}>{"7.5/100"}</Text>
                            <Text style={[TypeStyles.textBold, { color: Colors.black }]}>{"15/100"}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.chartContainer}>
                    <Text style={[TypeStyles.textBold, { marginBottom: 16 }]}>{"Dự đoán xu hướng tài chính"}</Text>
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
                </View>
            </ScrollView>
        </LinearGradient>
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
        marginVertical: spacing.padding.large,
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: spacing.padding.large,
        borderRadius: 16,
    },
    radarChart: {
        marginTop: spacing.padding.large,
    },
});