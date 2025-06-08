import { BackButton } from '@/components/Button';
import { usePlanetStore } from '@/core/stores';
import { spacing } from '@/core/styles';
import { ImageBackground } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlanetItem } from '@/components/personal/planet';
import { colors, textStyle } from '@/core/styles';
import { GET_SUBJECT } from '@/core/apollo/queries';
import { useMutation, useQuery } from '@apollo/client';
import strings from '@/core/localization';
import { ASTROME } from '@/core/apollo/mutations';


export default function PlanetsScreen() {
    const { data: dataSubject, loading, error, refetch } = useQuery(GET_SUBJECT);
    const planets = usePlanetStore(state => state.planets);
    const setPlanets = usePlanetStore(state => state.actions.setPlanets);
    const setPlanet = usePlanetStore(state => state.actions.setPlanet);
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [AstroMe, { data: astroMe, loading: loadingMe, error: errorMe }] =
    useMutation(ASTROME);
    const planetList = Array.isArray(planets) ? planets : [];

    useEffect(() => {
        if (dataSubject?.get_subject) {
            setPlanets(dataSubject.get_subject.planets);
        }
    }, [dataSubject]);

    const renderItem = ({ item }: any) => {
        return (
            <PlanetItem
                data={item}
                onPress={() => {
                      setPlanet(item);
                      router.push('/PlanetScreen');
                      AstroMe({
                        variables: {
                          planet: item.name,
                          sign: item.sign_name,
                        },
                      });
                }}
            />
        );
    };

    return <ImageBackground source={require('@/assets/images/bg_planet.png')} style={{ flex: 1, paddingTop: insets.top }}>
        <BackButton onPress={() => router.back()} title={strings.t('txtPlanetsAndSign')} />
        <View style={styles.container}>
            <FlatList
                data={planetList}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.name + index}
                numColumns={2}
                contentContainerStyle={{
                    paddingHorizontal: spacing.ssm,
                    paddingBottom: spacing.big,
                    paddingTop: 12,
                }}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    marginBottom: 12,
                }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    </ImageBackground>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    menuContainer: {
        width: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 16,
        borderRightWidth: 1,
        borderRightColor: 'rgba(255, 255, 255, 0.2)',
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    activeMenuItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderLeftWidth: 3,
        borderLeftColor: colors.white,
    },
    menuText: {
        color: colors.white,
        fontSize: 14,
    },
    activeMenuText: {
        fontWeight: 'bold',
    },
});