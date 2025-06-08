import { BackButton } from '@/components/Button';
import { CardView } from '@/components/Card';
import strings from '@/core/localization';
import { usePlanetStore } from '@/core/stores';
import { colors, spacing, textStyle } from '@/core/styles';
import { ImageBackground } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingLuna from '@/components/loading/LoadingLuna';

const width = Dimensions.get('window').width;
export default function PlanetScreen() {
    const planet = usePlanetStore(state => state.planet);
    const loading = usePlanetStore(state => state.loading);
    const planetSign = usePlanetStore(state => state.planetSign);
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const renderItem = (title: string, content: string) => {
        return (
            <View style={{}}>
                <Text style={[textStyle.textBold, { color: colors.white }]}>{title}</Text>
                <Text style={[textStyle.bodyText2, { color: colors.white }]}>{content}</Text>
            </View>
        );
    };


    return <ImageBackground source={require('@/assets/images/bg_planet.png')} style={{ flex: 1, paddingTop: insets.top }}>
        <BackButton onPress={() => router.back()} title={`${planet?.name_label} ${planet?.sign_label}`} />
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.large, paddingBottom: spacing.big }}>
            <View style={{ flex: 1 }}>
                {loading && <View style={{
                    backgroundColor: "#2155A0BF",
                    borderRadius: spacing.sm,
                    padding: spacing.large,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <LoadingLuna />
                </View>}
                {
                    !loading &&
                    <View style={styles.wrapper}>
                        <LinearGradient colors={['#395A8A73', '#357FE9']} style={styles.container}>
                            {planetSign?.pros && renderItem(strings.t("pros"), planetSign.pros)}
                            {planetSign?.cons && renderItem(strings.t("cons"), planetSign.cons)}
                            {planetSign?.favorite &&
                                renderItem(strings.t("favorite"), planetSign.favorite)}
                        </LinearGradient>
                    </View>
                }

                {!loading && planetSign?.paraphrase && (
                    <CardView
                        textStyleProp={[textStyle.bodyText2, {
                            lineHeight: 23
                        }]}
                        description={planetSign.paraphrase}
                        style={{
                            borderWidth: 0
                        }} />
                )}
            </View>
        </ScrollView>
    </ImageBackground>
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.4, // Similar to #00000052
        shadowRadius: 4,
        marginBottom: 16
    },
    container: {
        flex: 1,
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 6,
    },
    containerBody: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        height: 1,
        backgroundColor: "#2D79E5",
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