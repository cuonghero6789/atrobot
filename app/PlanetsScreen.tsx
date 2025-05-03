import { BackButton } from '@/components/Button';
import usePlanetStore from '@/stores/PlanetStore';
import spacing from '@/styles/spacing';
import { ImageBackground } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlanetItem } from '@/components/personal/planet';

export default function PlanetsScreen() {
    const planets = usePlanetStore(state => state.planets);
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const renderItem = ({ item }: any) => {
        return (
            <PlanetItem
                data={item}
                onPress={() => {
                    //   actionPlanet.setPlanet(item);
                    //   navigation.navigate('PlanetScreen');
                    //   AstroMe({
                    //     variables: {
                    //       planet: item.name,
                    //       sign: item.sign_name,
                    //     },
                    //   });
                }}
            />
        );
    };

    return <ImageBackground source={require('@/assets/images/bg_planet.png')} style={{ flex: 1, paddingTop: insets.top }}>
        <BackButton onPress={() => router.back()} />
        <FlatList
            data={planets}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.name + index}
            numColumns={2}
            contentContainerStyle={{
                paddingHorizontal: spacing.padding.large,
                paddingBottom: spacing.padding.big,
                paddingTop: 16,
            }}
            columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 16,
            }}
            showsVerticalScrollIndicator={false}
        />
    </ImageBackground>
}

const styles = StyleSheet.create({
});