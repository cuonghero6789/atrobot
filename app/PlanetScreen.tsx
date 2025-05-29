import { BackButton } from '@/components/Button';
import strings from '@/core/localization';
import { usePlanetStore } from '@/core/stores';
import { colors, spacing } from '@/core/styles';
import { ImageBackground } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PlanetScreen() {
    const planet = usePlanetStore(state => state.planet);
    const planetSign = usePlanetStore(state => state.planetSign);
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const renderItem = (title: string, content: string) => {
        return (
            <View style={{ paddingVertical: 16 }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
            </View>
        );
    };


    return <ImageBackground source={require('@/assets/images/bg_planet.png')} style={{ flex: 1, paddingTop: insets.top }}>
        <BackButton onPress={() => router.back()} />
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.large, paddingBottom: spacing.big }}>
            <View style={{ flex: 1 }}>
                {planet && (
                    <Text>{`${planet.name_label} ${planet.sign_label}`}</Text>
                )}
                <View style={styles.line} />
                {planetSign?.pros && renderItem(strings.t("pros"), planetSign.pros)}
                <View style={styles.line} />
                {planetSign?.cons && renderItem(strings.t("cons"), planetSign.cons)}
                <View style={styles.line} />
                {planetSign?.favorite &&
                    renderItem(strings.t("favorite"), planetSign.favorite)}
                {planetSign?.paraphrase && (
                    <View style={styles.body}>
                        <Text style={styles.contentBody}>{planetSign.paraphrase}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    </ImageBackground>
}

const styles = StyleSheet.create({
    containerBody: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        height: 1,
        backgroundColor: colors.white,
    },
    body: {
        borderRadius: 12,
        backgroundColor: colors.bgColor7,
        padding: 16,
        marginVertical: 16,
    },
    contentBody: {
        fontSize: 14,
        color: colors.white,
    },
    planet: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.white,
        marginVertical: 16,
    },
    container: {
        backgroundColor: colors.bgColor2,
        flex: 1,
    },
    title: {
        color: colors.gray2,
        fontSize: 14,
    },
    content: {
        fontSize: 14,
        color: colors.white,
    },

    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});