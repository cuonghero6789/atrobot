import { House, Planet } from '@/assets/images/planet';
import { PlanetModel } from '@/core/types/atro';
import { colors } from '@/core/styles';
import { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
        <View style={styles.wrapper}>
            <LinearGradient
                colors={['#395A8A73', '#357FE9']}
                style={styles.container}
            >
                <TouchableOpacity onPress={onPress}>
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
                    <Image source={require('@/assets/images/ic_arrow_right_white.png')} style={{ width: 9, height: 12, position: 'absolute', right: 8, bottom: 8 }} />
                </TouchableOpacity>
            </LinearGradient>
        </View>

    );
};

const MemozedPlanetItem = memo(PlanetItem)

export {
    MemozedPlanetItem as PlanetItem
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.4, // Similar to #00000052
        shadowRadius: 4,
    },
    container: {
        flex: 1,
        borderRadius: 12,
        borderColor: colors.white,
        padding: 16,
        marginHorizontal: 6,
        borderWidth: 1,

    },
    title: {
        color: colors.white,
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 12,
    },
});
