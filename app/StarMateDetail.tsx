import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ImageBackground, Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, textStyle } from '@/core/styles';
import strings from '@/core/localization';
import { BackButton } from '@/components/Button';
import LoadingLuna from '@/components/loading/LoadingLuna';
import AtroHtml from '@/components/AtroHtml';
import StarMateScore from '@/components/starmate/StarMateScore';
import useStarMatesStore from '@/core/stores/atro/StarMatesStore';
import { BannerAdmob } from '@/components/ads/CustomAdmob';
const { width } = Dimensions.get('window');
function convertMarkdownToHtml(md: string): string {
    if (!md) return '';
    // Basic conversions: bold **text**, line breaks, simple dashes
    let html = md
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\n/g, '<br/>');
    return html;
}

export default function StarMateDetailScreen() {
    const insets = useSafeAreaInsets();
    const { isLoading, user, starMate } = useStarMatesStore(state => state);
    const rawContent = starMate?.content || '';
    console.log('isLoading ===> ', isLoading);

    const score = useMemo(() => {
        const m = rawContent.match(/(\d{1,3})%/);
        if (!m) return undefined;
        const v = parseInt(m[1], 10);
        if (isNaN(v)) return undefined;
        return Math.max(0, Math.min(100, v));
    }, [rawContent]);

    const htmlContent = useMemo(() => convertMarkdownToHtml(rawContent), [rawContent]);

    return (
        <ImageBackground source={require('@/assets/images/bg_home.png')} style={{ flex: 1, paddingTop: insets.top }}>
            <BackButton onPress={() => router.back()} title={strings.t('starMates')} />
            {isLoading ? (
                <LoadingLuna />
            ) : (
                <LinearGradient
                    colors={["#2D79E5DB", "#274877DB"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.hero}
                >
                    <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxxl, padding: spacing.large }}>
                        {
                            score && <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <StarMateScore title={strings.t('compatibilityLevel')} score={`${score}%` || "0%"} size={width - 64} />
                            </View>
                        }
                        <AtroHtml desc={htmlContent} />
                    </ScrollView>
                </LinearGradient>
            )}
        <BannerAdmob style={{ bottom: 0 }} />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2D79E559',
        flex: 1,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
    },
    hero: {
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        alignItems: 'center',
        marginBottom: spacing.large,
    },
    heroLeft: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.large,
    },
    luna: {
        width: 48,
        height: 48,
    },
    heroRight: {
        flex: 1,
    },
    heroTitle: {
        color: '#ffffff',
    },
    heroPreview: {
        color: 'rgba(255,255,255,0.95)',
        marginTop: spacing.sm,
    },
    scorePill: {
        marginTop: spacing.md,
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFFB3',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },
    scoreText: {
        color: colors.black3,
    },
    section: {
        color: colors.black3,
        marginBottom: spacing.sm,
    },
    card: {
        backgroundColor: '#FFFFFFB3',
        marginHorizontal: spacing.large,
        padding: spacing.large,
        borderRadius: 16,
    },
});


