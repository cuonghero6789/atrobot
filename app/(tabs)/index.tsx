import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { getCurrentLocation } from '@/core/permission/Location';
import { Image, ImageBackground } from 'expo-image';
import spacing from '@/styles/spacing';
import Colors from '@/styles/Colors';
import TypeStyles from '@/styles/TypeStyle';
import HomeCalendar from '@/components/home/HomeCalendar';
import { HomeButton } from '@/components/home/HomeButton';
import useSync from '@/hooks/useSync';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import useWebSocket from '@/socket/Socket';
import moment from 'moment';
import useDailyStore from '@/stores/DailyStore';
import AtroHtml from '@/components/AtroHtml';
import { SkeletonLoaderEvent } from '@/components/loading/LoadingView';
import strings from '@/localization';
const { width, height } = Dimensions.get('window');
export default function DailyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const weekly = useDailyStore(state => state.weekly);
  const actions = useDailyStore(state => state.actions);

  const { onRefresh, updateCurrentLocation } = useSync();
  const [fromDate, setFromDate] = useState<string>(
    moment().format('YYYY-MM-DD').toString(),
  );

  useEffect(()=>{
    actions.getCacheScores();
    actions.getCacheQuote();
    actions.getCacheMonthly();
    actions.getCacheDaily();
  },[]);
  // init app
  useEffect(()=> {
    if(fromDate) {
      onRefresh(fromDate);
    }
  },[fromDate]);

  useWebSocket(() => {
    onRefresh(fromDate);
  });

  useEffect(() => {
    const location = async () => {
      const data = await getCurrentLocation();
      console.log(`data current location: ${JSON.stringify(data)}`);
      const coords = data?.coords;
      if (coords) {
        updateCurrentLocation(coords.latitude, coords.longitude);
      }
    }
    location();
  }, []);

  return <ImageBackground source={require('@/assets/images/bg_home.png')} style={{ flex: 1, paddingTop: insets.top }}>
    <View style={styles.info}>
      <Text style={[TypeStyles.text, styles.text]}>{strings.t("hello")}</Text>
      <Text style={[TypeStyles.textBold, styles.title]}>{strings.t("dailyScreen")}</Text>
    </View>
    <View style={styles.profile}>
      <HomeButton text={strings.t("personal")} onPress={() => {
        router.navigate({
          pathname: "/personal",
        })
      }} />
      <View style={styles.starmates}>
        <HomeButton text="StarMates" onPress={() => {
          router.navigate({
            pathname: "/starmates",
          })
        }} />
        <View style={styles.manifest}>
          <HomeButton text="Manifest" onPress={() => {
            router.navigate({
              pathname: "/divine",
            })
          }} />
          <Image source={require('@/assets/images/bg_star.png')} style={{ width, height: width, position: 'absolute', marginTop: spacing.margin.big }} />
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', paddingBottom: spacing.padding.extraLarge, paddingTop: spacing.margin.bigx2 }}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <HomeCalendar />
              </View>
              <View style={{ padding: spacing.padding.large, flex: 1 }}>
                {weekly?.events?.[0] ? <AtroHtml desc={weekly?.events?.[0] || ""} /> : <SkeletonLoaderEvent />}
              </View>
            </View>
            <View style={{ backgroundColor: '#B2D1FDBF', flex: 1, flexDirection: 'row', padding: spacing.padding.large }}>
              <View style={{ flex: 1 }}>
                <Text style={[TypeStyles.subTitle1, { color: Colors.green }]}>{strings.t("should")}</Text>
                <Text style={[TypeStyles.bodyText, { color: Colors.black4, lineHeight: 18, marginTop: spacing.margin.large, marginRight: spacing.margin.large }]}>{weekly.horoscope_do?.[0]}</Text>
              </View>
              <View style={{ paddingTop: spacing.padding.extraLarge }}>
                <Image source={require('@/assets/images/ic_line.png')} style={{ width: 2, height: '100%' }} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[TypeStyles.subTitle1, { color: Colors.green, textAlign: 'right' }]}>{strings.t("dont")}</Text>
                <Text style={[TypeStyles.bodyText, { color: Colors.black4, lineHeight: 18, marginLeft: spacing.margin.large, marginTop: spacing.margin.large, textAlign: 'right' }]}>{weekly.horoscope_dont?.[0]}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  </ImageBackground>
}

const styles = StyleSheet.create({
  info: {
    marginBottom: spacing.margin.big,
    paddingHorizontal: spacing.padding.large
  },
  manifest: {
    marginTop: spacing.margin.big,
    backgroundColor: "#827EAB59",
    flex: 1,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  starmates: {
    marginTop: spacing.margin.big,
    backgroundColor: "#A6B5C5BF",
    flex: 1,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  profile: {
    backgroundColor: "#2D79E559",
    flex: 1,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  container: {
    justifyContent: 'center',
  },
  title: {
    color: Colors.black3,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  text: {
    color: Colors.black3,
    fontSize: 16,
    lineHeight: 28,
  },
});