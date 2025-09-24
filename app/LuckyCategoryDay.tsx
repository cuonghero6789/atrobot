import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ImageBackground, Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, textStyle } from '@/core/styles';
import strings from '@/core/localization';
import { BackButton } from '@/components/Button';
import { LineChart } from 'react-native-gifted-charts';

type CategoryKey = 'love' | 'finance' | 'health' | 'career';

export default function LuckyCategoryDayScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const category = (params.category as string) as CategoryKey;
  const dateIso = params.date as string | undefined;

  const dateText = useMemo(() => {
    if (!dateIso) return '';
    const d = new Date(dateIso);
    const dd = `${d.getDate()}`.padStart(2, '0');
    const mm = `${d.getMonth() + 1}`.padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }, [dateIso]);

  const iconSource = useMemo(() => {
    switch (category) {
      case 'love':
        return require('@/assets/images/icons/ic_love.png');
      case 'finance':
        return require('@/assets/images/icons/ic_finance.png');
      case 'health':
        return require('@/assets/images/icons/ic_suckhoe.png');
      case 'career':
      default:
        return require('@/assets/images/icons/ic_carier.png');
    }
  }, [category]);

  const gradientColors = useMemo<[string, string]>(() => {
    switch (category) {
      case 'love':
        return ['#FF6F91', '#FF9671'];
      case 'finance':
        return ['#00C853', '#64DD17'];
      case 'health':
        return ['#00B0FF', '#40C4FF'];
      case 'career':
      default:
        return ['#FF9800', '#FFC107'];
    }
  }, [category]);

  // Demo deterministic score for the selected category at the given date
  const score = useMemo(() => {
    if (!dateIso) return 0;
    const d = new Date(dateIso);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}-${category}`;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
    }
    const rnd = Math.sin(hash) * 10000;
    const v = rnd - Math.floor(rnd);
    return Math.round(v * 100);
  }, [dateIso, category]);

  const influences = useMemo(() => {
    // Demo placeholder influences by category
    switch (category) {
      case 'love':
        return ['Venus', 'Moon', 'Neptune'];
      case 'finance':
        return ['Jupiter', 'Saturn', 'Mercury'];
      case 'health':
        return ['Sun', 'Moon', 'Mars'];
      case 'career':
      default:
        return ['Saturn', 'Mars', 'Pluto'];
    }
  }, [category]);

  const summaryText = useMemo(() => {
    switch (category) {
      case 'love':
        return 'Năng lượng cảm xúc tăng, phù hợp kết nối và hẹn hò. Hãy tinh tế lắng nghe.';
      case 'finance':
        return 'Tư duy sáng suốt cho kế hoạch tài chính. Tránh quyết định vội vàng, ưu tiên dài hạn.';
      case 'health':
        return 'Thích hợp bắt đầu thói quen lành mạnh. Ngủ đủ và uống nước nhiều hơn hôm nay.';
      case 'career':
      default:
        return 'Tập trung cao, thuận lợi cho lập kế hoạch và hoàn thành công việc quan trọng.';
    }
  }, [category]);

  const doList = useMemo(() => {
    switch (category) {
      case 'love':
        return ['Chủ động trò chuyện', 'Lên lịch gặp gỡ', 'Viết nhật ký cảm xúc'];
      case 'finance':
        return ['Rà soát chi tiêu', 'Cập nhật ngân sách', 'Tìm hiểu cơ hội đầu tư'];
      case 'health':
        return ['Tập nhẹ 20 phút', 'Uống 2L nước', 'Ngủ trưa 15 phút'];
      case 'career':
      default:
        return ['Ưu tiên công việc quan trọng', 'Chia nhỏ mục tiêu', 'Gửi báo cáo sớm'];
    }
  }, [category]);

  const dontList = useMemo(() => {
    switch (category) {
      case 'love':
        return ['Tranh luận khi đang mệt', 'Đào xới chuyện cũ'];
      case 'finance':
        return ['Chi tiêu cảm tính', 'Theo tin đồn chưa xác thực'];
      case 'health':
        return ['Tập quá sức', 'Bỏ bữa sáng'];
      case 'career':
      default:
        return ['Họp không mục tiêu', 'Đa nhiệm quá nhiều'];
    }
  }, [category]);

  const hourlyData = useMemo(() => {
    // 24 giờ: tạo dữ liệu deterministic theo giờ
    const d = dateIso ? new Date(dateIso) : new Date();
    const baseKey = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}-${category}`;
    const arr: { value: number }[] = [];
    for (let h = 0; h < 24; h++) {
      const key = `${baseKey}-${h}`;
      let hash = 0;
      for (let i = 0; i < key.length; i++) hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
      const rnd = Math.sin(hash) * 10000;
      const v = rnd - Math.floor(rnd);
      arr.push({ value: Math.round(v * 100) });
    }
    return arr;
  }, [dateIso, category]);

  return (
    <ImageBackground source={require('@/assets/images/bg_home.png')} style={{ flex: 1, paddingTop: insets.top }}>
      <BackButton onPress={() => router.back()} />
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.large }}>
        <View style={styles.header}>
          <Text style={[textStyle.textBold, styles.title]}>{strings.t(category)}</Text>
          {!!dateText && <Text style={[textStyle.text, styles.subTitle]}>{dateText}</Text>}
        </View>

        <View style={styles.container}>
          <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.hero}>
            <View style={styles.heroLeft}>
              <Image source={iconSource} style={styles.icon} contentFit="contain" />
            </View>
            <View style={styles.heroRight}>
              <Text style={[textStyle.textBold3, styles.heroScoreLabel]}>{strings.t('score') || 'Score'}</Text>
              <Text style={styles.heroScoreValue}>{score}</Text>
              <Text style={styles.heroHint}>{strings.t('higherIsBetter') || 'Higher is better today'}</Text>
            </View>
          </LinearGradient>

          <View style={styles.card}>
            <Text style={[textStyle.subTitle1, styles.section]}>{strings.t('influences') || 'Key influences'}</Text>
            <View style={styles.chipsRow}>
              {influences.map((p) => (
                <Text key={p} style={styles.chip}>{p}</Text>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={[textStyle.subTitle1, styles.section]}>{strings.t('hourlyTrend') || 'Hourly trend'}</Text>
            <View style={{ marginTop: spacing.md }}>
              <LineChart
                areaChart
                data={hourlyData}
                hideDataPoints
                spacing={12}
                thickness={2}
                startFillColor={'rgba(40,72,120,0.35)'}
                endFillColor={'rgba(40,72,120,0.05)'}
                startOpacity={1}
                endOpacity={0.2}
                color={'#284878'}
                yAxisTextStyle={{ color: colors.black4 }}
                xAxisLabelTextStyle={{ color: colors.black4 }}
                hideRules
                initialSpacing={0}
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={[textStyle.subTitle1, styles.section]}>{strings.t('todaySummary') || 'Today summary'}</Text>
            <Text style={[textStyle.bodyText2, styles.body]}>{summaryText}</Text>
          </View>

          <View style={styles.card}>
            <Text style={[textStyle.subTitle1, styles.section]}>{strings.t('do') || 'Nên làm'}</Text>
            {doList.map((item) => (
              <Text key={item} style={[textStyle.bodyText2, styles.listItem]}>• {item}</Text>
            ))}
            <Text style={[textStyle.subTitle1, styles.section, { marginTop: spacing.large }]}>{strings.t('dont') || 'Tránh'}</Text>
            {dontList.map((item) => (
              <Text key={item} style={[textStyle.bodyText2, styles.listItem]}>• {item}</Text>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={[textStyle.subTitle1, styles.section]}>
              {strings.t('tips') || 'Tips'}
            </Text>
            <Text style={[textStyle.bodyText2, styles.body]}>
              {strings.t('genericTips') || 'Plan important actions when the score peaks to maximize outcomes.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.big,
    paddingHorizontal: spacing.large,
  },
  title: {
    color: colors.black3,
    fontSize: 20,
    lineHeight: 28,
  },
  subTitle: {
    color: colors.black4,
    marginTop: 6,
  },
  container: {
    backgroundColor: '#2D79E559',
    flex: 1,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    paddingTop: 32,
    paddingBottom: spacing.extraLarge,
  },
  hero: {
    marginHorizontal: spacing.large,
    borderRadius: 16,
    padding: spacing.large,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  heroLeft: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 48,
    height: 48,
  },
  heroRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  heroScoreLabel: {
    color: '#ffffff',
  },
  heroScoreValue: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  heroHint: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  section: {
    color: colors.black3,
    marginHorizontal: spacing.large,
    marginTop: spacing.large,
  },
  card: {
    backgroundColor: '#FFFFFFB3',
    marginHorizontal: spacing.large,
    padding: spacing.large,
    borderRadius: 16,
    marginBottom: spacing.md,
  },
  body: {
    color: colors.black4,
    marginTop: spacing.sm,
  },
  link: {
    color: '#284878',
    marginTop: spacing.sm,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: spacing.md,
  },
  chip: {
    backgroundColor: '#284878',
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  listItem: {
    color: colors.black4,
    marginTop: spacing.sm,
    marginLeft: spacing.large,
  },
});


