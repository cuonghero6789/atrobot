import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PeriodSelector } from '@/components/manifest/PeriodSelector';
import { colors, spacing, textStyle } from '@/core/styles';
import strings from '@/core/localization';
import { router } from 'expo-router';
import { BackButton } from '@/components/Button';
import { useLuckyDayStore } from '@/core/stores';
import { ASTRO_STAR_MATES } from '@/core/apollo/mutations/atro';
import { useMutation } from '@apollo/client';
import LoadingLuna from '@/components/loading/LoadingLuna';

type Period = 'week' | 'month';

export default function LuckyDayScreen() {
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week');
  const [AstroCustom, { data: dataCustom, loading: loadingCustom, error: errorCustom }] =
    useMutation(ASTRO_STAR_MATES);
  const { week, month, isLoading, actions } = useLuckyDayStore(state => state);

  const parseDate = useCallback((dateStr: string) => {
    const [yyyy, mm, dd] = (dateStr || '').split('-').map(Number);
    return new Date(yyyy || 0, (mm || 1) - 1, dd || 1);
  }, []);

  const formatDate = useCallback((dateStr: string) => {
    const d = parseDate(dateStr);
    const dd = `${d.getDate()}`.padStart(2, '0');
    const mm = `${d.getMonth() + 1}`.padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }, [parseDate]);

  useEffect(() => {
    const dateRange = selectedPeriod === 'week' ? week : month;
    if (dateRange?.length) {
      actions.setIsLoading(false);
      return;
    }

    actions.setIsLoading(true);
    AstroCustom({
      variables: {
        action: "astro_lucky_day",
        user_input: JSON.stringify({
          date_range: selectedPeriod,
          top: 7
        })
      }
    }).catch(() => {
      actions.setIsLoading(false);
    });
  }, [selectedPeriod, week, month, actions]);

  const formatWeekday = useCallback((dateStr: string) => {
    const day = parseDate(dateStr).getDay();
    switch (day) {
      case 0:
        return 'Chủ nhật';
      case 1:
        return 'Thứ 2';
      case 2:
        return 'Thứ 3';
      case 3:
        return 'Thứ 4';
      case 4:
        return 'Thứ 5';
      case 5:
        return 'Thứ 6';
      case 6:
        return 'Thứ 7';
      default:
        return '';
    }
  }, [parseDate]);

  // Stop loading when data for current period arrives
  useEffect(() => {
    if ((selectedPeriod === 'week' && week && week.length) || (selectedPeriod === 'month' && month && month.length)) {
      actions.setIsLoading(false);
    }
  }, [week, month, selectedPeriod]);

  const data = selectedPeriod === 'week' ? week : month;
  const sortedData = useMemo(() => {
    return (data ? [...data].sort((a, b) => (b.score || 0) - (a.score || 0)) : []);
  }, [data]);

  return (
    <ImageBackground source={require('@/assets/images/bg_home.png')} style={{ flex: 1, paddingTop: insets.top }}>
      <BackButton onPress={() => router.back()} />
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.large }}>
        <View style={styles.header}>
          <Text style={[textStyle.text, styles.greeting]}>{strings.t('hello') + " Phan Cường"}</Text>
          <Text style={[textStyle.textBold, styles.title]}>{strings.t('luckyDayTitle') || 'Lucky Day'}</Text>
        </View>

        <View style={styles.container}>
          <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
          {/* Filter removed per request */}

          <View style={styles.results}>
            {isLoading ? (
              <LoadingLuna />
            ) : !sortedData.length ? (
              <Text style={[textStyle.bodyText2, styles.emptyText]}>
                {strings.t('noResultsYet') || 'Results will appear here'}
              </Text>
            ) : (
              sortedData.map((r, idx) => (
                <View key={`${r.date}-${idx}`} style={styles.card}>
                  <LinearGradient
                    colors={idx === 0 ? ['#FFD700', '#FFC107'] : idx === 1 ? ['#C0C0C0', '#B0BEC5'] : ['#CD7F32', '#A1887F']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.cardHeader}
                  >
                    <Text style={styles.rankBadge}>#{idx + 1}</Text>
                    <Text style={styles.cardTitle}>{`${formatWeekday(r.date)} · ${formatDate(r.date)}`}</Text>
                    <Text style={styles.cardScore}>Score {Math.round(r.score)}</Text>
                  </LinearGradient>

                  <TouchableOpacity
                    disabled
                    style={styles.progressGroup}
                    activeOpacity={0.7}
                    onPress={() => router.push({ pathname: '/LuckyCategoryDay', params: { category: 'love', date: r.date } })}
                  >
                    <Text style={styles.progressLabel}>{strings.t('love') || 'Love'}</Text>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${r.love}%`, backgroundColor: '#E91E63' }]} />
                    </View>
                    <Text style={styles.progressValue}>{Math.round(r.love)}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    disabled
                    style={styles.progressGroup}
                    activeOpacity={0.7}
                    onPress={() => router.push({ pathname: '/LuckyCategoryDay', params: { category: 'finance', date: r.date } })}
                  >
                    <Text style={styles.progressLabel}>{strings.t('finance') || 'Finance'}</Text>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${r.money}%`, backgroundColor: '#4CAF50' }]} />
                    </View>
                    <Text style={styles.progressValue}>{Math.round(r.money)}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    disabled
                    style={styles.progressGroup}
                    activeOpacity={0.7}
                  // onPress={() => router.push({ pathname: '/LuckyCategoryDay', params: { category: 'health', date: r.date } })}
                  >
                    <Text style={styles.progressLabel}>{strings.t('health') || 'Health'}</Text>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${r.health}%`, backgroundColor: '#2196F3' }]} />
                    </View>
                    <Text style={styles.progressValue}>{Math.round(r.health)}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    disabled
                    style={styles.progressGroup}
                    activeOpacity={0.7}
                    onPress={() => router.push({ pathname: '/LuckyCategoryDay', params: { category: 'career', date: r.date } })}
                  >
                    <Text style={styles.progressLabel}>{strings.t('career') || 'Career'}</Text>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${r.career}%`, backgroundColor: '#FF9800' }]} />
                    </View>
                    <Text style={styles.progressValue}>{Math.round(r.career)}</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
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
  greeting: {
    color: colors.black3,
    fontSize: 16,
    lineHeight: 28,
  },
  title: {
    color: colors.black3,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  container: {
    backgroundColor: '#2D79E559',
    flex: 1,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    paddingTop: 32,
    paddingBottom: spacing.extraLarge,
  },
  section: {
    color: colors.black3,
    marginHorizontal: spacing.large,
    marginTop: spacing.large,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#D9D9D9',
    color: '#284878',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: '#74A7EE',
    color: '#fff',
  },
  results: {
  },
  card: {
    backgroundColor: '#FFFFFFB3',
    marginHorizontal: spacing.large,
    padding: spacing.large,
    borderRadius: 16,
    marginBottom: spacing.md,
  },
  cardHeader: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rankBadge: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: 'bold',
  },
  cardTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cardScore: {
    color: '#ffffff',
  },
  progressGroup: {
    marginTop: spacing.md,
  },
  progressLabel: {
    color: colors.black3,
    marginBottom: 6,
  },
  progressTrack: {
    height: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(40, 72, 120, 0.15)',
  },
  progressFill: {
    height: 8,
    borderRadius: 8,
  },
  progressValue: {
    color: colors.black4,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  actionRow: {
    marginTop: spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionChip: {
    backgroundColor: '#284878',
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 8,
    marginTop: 8,
  },
  emptyText: {
    color: colors.black4,
    marginHorizontal: spacing.large,
    marginTop: spacing.md,
  },
  score: {
    color: colors.black4,
    marginTop: spacing.sm,
  },
});


