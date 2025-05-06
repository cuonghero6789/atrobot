import { BackButton } from '@/components/Button';
import usePlanetStore from '@/stores/PlanetStore';
import spacing from '@/styles/spacing';
import { ImageBackground } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlanetItem } from '@/components/personal/planet';
import Colors from '@/styles/Colors';
import TypeStyles from '@/styles/TypeStyle';

const { width } = Dimensions.get('window');

const MenuItem = ({ text, isActive, onPress }: { text: string; isActive: boolean; onPress: () => void }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.menuItem, isActive && styles.activeMenuItem]}
    >
      <Text style={[TypeStyles.text, styles.menuText, isActive && styles.activeMenuText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default function PlanetsScreen() {
    const planets = usePlanetStore(state => state.planets);
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [activeMenu, setActiveMenu] = React.useState('planets');

    const menuItems = [
        { id: 'planets', text: 'Planets' },
        { id: 'houses', text: 'Houses' },
        { id: 'aspects', text: 'Aspects' },
    ];

    const planetList = Array.isArray(planets) ? planets : [];

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
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.id}
                        text={item.text}
                        isActive={activeMenu === item.id}
                        onPress={() => setActiveMenu(item.id)}
                    />
                ))}
            </View>
            <FlatList
                data={planetList}
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
        borderLeftColor: Colors.white,
    },
    menuText: {
        color: Colors.white,
        fontSize: 14,
    },
    activeMenuText: {
        fontWeight: 'bold',
    },
});