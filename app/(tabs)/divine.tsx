import { ASTROME_DAILY, ASTROME_MONTHLY } from "@/apollo/mutation";
import CustomCarousel from "@/components/Carousel";
import { HomeButtonBackground } from "@/components/home/HomeButton";
import ManifestDays from "@/components/manifest/ManifestDays";
import { PeriodSelector } from "@/components/manifest/PeriodSelector";
import strings from "@/localization";
import useAccountStore from "@/stores/AccountStore";
import useDailyStore from "@/stores/DailyStore";
import Colors from "@/styles/Colors";
import spacing from "@/styles/spacing";
import TypeStyles from "@/styles/TypeStyle";
import { useMutation } from "@apollo/client";
import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import moment from "moment";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DivineScreen() {
  const [AstroDaily, { data, loading: loadingAstroDaily, error }] = useMutation(ASTROME_DAILY);
  const [AstroMonthly, { data: dataMonth, loading: loadingAstroDailyMonthly, error: errorMonthly }] = useMutation(ASTROME_MONTHLY);

    const weekly = useDailyStore(state => state.weekly);
    const monthly = useDailyStore(state => state.monthly);
    const quote = useDailyStore(state => state.quote);
    const actions = useDailyStore(state => state.actions);
    const userAccount = useAccountStore(state => state.user);
    const [fromDate, setFromDate] = useState<string>(
        moment().format('YYYY-MM-DD').toString(),
    );
    const scores = useDailyStore(state => state.scores)?.[fromDate];
    const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');
    const router = useRouter();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (selectedPeriod === 'week') {
            AstroDaily({ variables: { from_date: moment().startOf('week').format('YYYY-MM-DD').toString() } });
        } else {
            AstroMonthly({ variables: { from_date: moment().startOf('month').format('YYYY-MM-DD').toString() } });
        }
    }, [selectedPeriod]);

    return <ImageBackground source={require('@/assets/images/bg_manifest.png')} style={{ flex: 1 }}>
        <View style={[styles.info, { paddingTop: insets.top }]}>
            <Text style={[TypeStyles.title, { color: Colors.black3 }]}>{strings.t("manifest")}</Text>
            <Text style={[TypeStyles.bodyText1, { color: Colors.gray, textAlign: "center", marginTop: spacing.margin.small }]}>{strings.t("manifestMessage")}</Text>
        </View>
        <View style={styles.profile}>
            <ScrollView>
                <View style={{ paddingHorizontal: spacing.padding.big, paddingTop: spacing.margin.bigx2 }}>
                    <Text style={[TypeStyles.subTitle2, { color: Colors.white, textAlign: 'center' }]}>{quote}</Text>
                </View>
                {/* <ManifestDays /> */}
                <PeriodSelector
                    selectedPeriod={selectedPeriod}
                    onPeriodChange={setSelectedPeriod}
                />
                <CustomCarousel daily={selectedPeriod === 'week' ? weekly?.weekly || [] : monthly?.monthly || []} scores={scores} />
                <View style={{ height: spacing.margin.large }} />
                <HomeButtonBackground text={strings.t("futureOfYou")} subText={strings.t("futureOfYouMessage")} onPress={() => {
                    router.push({
                        pathname: "/questions",
                    });
                }} />
                <View style={{ height: spacing.margin.large }} />
                <HomeButtonBackground text={strings.t("luckyDay")} subText={strings.t("luckyDayMessage")} onPress={() => { }} />
            </ScrollView>
        </View>
    </ImageBackground>
}

const styles = StyleSheet.create({
    info: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.padding.large
    },
    profile: {
        backgroundColor: "#827EAB59",
        flex: 1,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        overflow: 'hidden',
    },
});
