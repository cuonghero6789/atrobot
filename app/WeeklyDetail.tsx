import { BackButton } from '@/components/Button';
import { CardView } from '@/components/Card';
import strings from '@/core/localization';
import { useSubjectStore } from '@/core/stores';
import { colors, spacing, textStyle } from '@/core/styles';
import { ImageBackground } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ElementDistribution from '@/components/personal/ElementDistribution';
import QualityDistribution from '@/components/personal/QualityDistribution';

export default function WeeklyDetailScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { subject } = useSubjectStore(state => state);
    const params = useLocalSearchParams<{ title?: string; content?: string }>();
    const title = typeof params.title === 'string' ? params.title : '';
    const content = typeof params.content === 'string' ? params.content : '';

    return <ImageBackground source={require('@/assets/images/bg_planet.png')} style={{ flex: 1, paddingTop: insets.top }}>
        <StatusBar style="light" backgroundColor="#000" />
        <BackButton onPress={() => router.back()} title={`${title} ${strings.t('ofYou')}`} />
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.large, paddingBottom: spacing.big }}>
            <CardView
                contanerStyle={{
                    paddingVertical: spacing.extraLarge,
                    marginHorizontal: spacing.large
                }}
                textStyleProp={[textStyle.bodyText2, {
                    fontSize: 14
                }]}
                description={content}
                style={{
                    borderWidth: 0
                }} />
            {
                subject?.element_distributions?.length &&
                <ElementDistribution />
            }
            {
                subject?.quality_distributions?.length &&
                <QualityDistribution />
            }
        </ScrollView>
    </ImageBackground>
}

const styles = StyleSheet.create({
});