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

type Period = 'week' | 'month';
type CategoryKey = 'love' | 'finance' | 'health' | 'career';

type ResultItem = {
  date: Date;
  score: number; // 0 - 100 weighted score
  breakdown: Record<CategoryKey, number>; // 0 - 100 per category
};

export default function LuckyDayScreen() {
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week');
  const [results, setResults] = useState<ResultItem[]>([]);

  const formatDate = useCallback((d: Date) => {
    const dd = `${d.getDate()}`.padStart(2, '0');
    const mm = `${d.getMonth() + 1}`.padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }, []);

  const formatWeekday = useCallback((d: Date) => {
    const day = d.getDay();
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
  }, []);

  const getDateRange = useCallback((period: Period): Date[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const count = period === 'week' ? 7 : 30;
    const out: Date[] = [];
    for (let i = 0; i < count; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      out.push(d);
    }
    return out;
  }, []);

  const pseudoRandom01 = (seed: number) => {
    // Basic deterministic hash → [0,1)
    const s = Math.sin(seed) * 10000;
    return s - Math.floor(s);
  };

  const categoryScoreForDate = (date: Date, category: CategoryKey): number => {
    const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${category}`;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
    }
    const rnd = pseudoRandom01(hash);
    return Math.round(rnd * 100);
  };

  const computeLuckyDays = useCallback(() => {
    const days = getDateRange(selectedPeriod);
    const computed: ResultItem[] = days.map((d) => {
      const breakdown: Record<CategoryKey, number> = {
        love: categoryScoreForDate(d, 'love'),
        finance: categoryScoreForDate(d, 'finance'),
        health: categoryScoreForDate(d, 'health'),
        career: categoryScoreForDate(d, 'career'),
      };
      // Overall score: simple average of the four categories
      const score = (breakdown.love + breakdown.finance + breakdown.health + breakdown.career) / 4;
      return { date: d, score: Math.round(score), breakdown };
    });
    computed.sort((a, b) => b.score - a.score);
    setResults(computed.slice(0, 3));
  }, [getDateRange, selectedPeriod]);

  // Auto compute whenever period or filter changes (and on mount)
  useEffect(() => {
    computeLuckyDays();
  }, [computeLuckyDays]);

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
            {results.length === 0 ? (
              <Text style={[textStyle.bodyText2, styles.emptyText]}>
                {strings.t('noResultsYet') || 'Results will appear here'}
              </Text>
            ) : (
              results.map((r, idx) => (
                <View key={`${r.date.toISOString()}-${idx}`} style={styles.card}>
                  <LinearGradient
                    colors={idx === 0 ? ['#FFD700', '#FFC107'] : idx === 1 ? ['#C0C0C0', '#B0BEC5'] : ['#CD7F32', '#A1887F']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.cardHeader}
                  >
                    <Text style={styles.rankBadge}>#{idx + 1}</Text>
                    <Text style={styles.cardTitle}>{`${formatWeekday(r.date)} · ${formatDate(r.date)}`}</Text>
                    <Text style={styles.cardScore}>Score {r.score}</Text>
                  </LinearGradient>

                  <TouchableOpacity
                    style={styles.progressGroup}
                    activeOpacity={0.7}
                    onPress={() => router.push({ pathname: '/LuckyCategoryDay', params: { category: 'love', date: r.date.toISOString() } })}
                  >
                    <Text style={styles.progressLabel}>{strings.t('love') || 'Love'}</Text>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${r.breakdown.love}%`, backgroundColor: '#E91E63' }]} />
                    </View>
                    <Text style={styles.progressValue}>{r.breakdown.love}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.progressGroup}
                    activeOpacity={0.7}
                    onPress={() => router.push({ pathname: '/LuckyCategoryDay', params: { category: 'finance', date: r.date.toISOString() } })}
                  >
                    <Text style={styles.progressLabel}>{strings.t('finance') || 'Finance'}</Text>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${r.breakdown.finance}%`, backgroundColor: '#4CAF50' }]} />
                    </View>
                    <Text style={styles.progressValue}>{r.breakdown.finance}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.progressGroup}
                    activeOpacity={0.7}
                    onPress={() => router.push({ pathname: '/LuckyCategoryDay', params: { category: 'health', date: r.date.toISOString() } })}
                  >
                    <Text style={styles.progressLabel}>{strings.t('health') || 'Health'}</Text>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${r.breakdown.health}%`, backgroundColor: '#2196F3' }]} />
                    </View>
                    <Text style={styles.progressValue}>{r.breakdown.health}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.progressGroup}
                    activeOpacity={0.7}
                    onPress={() => router.push({ pathname: '/LuckyCategoryDay', params: { category: 'career', date: r.date.toISOString() } })}
                  >
                    <Text style={styles.progressLabel}>{strings.t('career') || 'Career'}</Text>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${r.breakdown.career}%`, backgroundColor: '#FF9800' }]} />
                    </View>
                    <Text style={styles.progressValue}>{r.breakdown.career}</Text>
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


