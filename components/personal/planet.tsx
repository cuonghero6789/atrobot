import { House, Planet } from '@/assets/images/planet';
import { PlanetModel } from '@/core/types/atro';
import { colors } from '@/core/styles';
import { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    data: PlanetModel;
    onPress: () => void;
}
type PlanetKey = keyof typeof Planet;
type HouseKey = keyof typeof House;

const PlanetItem = ({ data, onPress }: Props) => {
    let sourcePlanet = Planet[data.name.toLowerCase() as PlanetKey] || Planet.sun
    let sourceHouse = House[data.sign_name as HouseKey] || House.Leo
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image
                source={sourcePlanet}
                style={{ width: 24, height: 24 }}
            />
            <Text style={styles.title}>{`${data.name_label || data.name} ${data.sign_label || data.sign
                }`}</Text>
            <Image
                source={sourceHouse}
                style={{ width: 24, height: 24 }}
            />
        </TouchableOpacity>
    );
};

const MemozedPlanetItem = memo(PlanetItem)

export {
    MemozedPlanetItem as PlanetItem
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundCard,
        borderRadius: 12,
        borderColor: colors.borderSecondary,
        padding: 16,
        marginHorizontal: 8,
    },
    title: {
        color: colors.white,
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 12,
    },
});
