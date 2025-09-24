import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors, spacing, textStyle } from '@/core/styles';

interface Props {
    title: string;
    score: number | string;
    size?: number; // overall square size of the composition
    style?: any;   // optional container style override
}

export default function StarMateScore({ title, score, size = 260, style }: Props) {
    const recSize = Math.round(size * 0.82);
    const layerSize = Math.round(size * 0.44);
    const titleTop = (size - layerSize) / 2 - 24; // position title slightly above the inner circle

    return (
        <View style={[styles.container, { width: size, height: size }, style]}>
            {/* Background group */}
            <View style={styles.absoluteCenter}>
                <Image
                    source={require('@/assets/images/starmate/sm_group.png')}
                    style={{ width: size, height: size }}
                    contentFit="contain"
                />
            </View>

            {/* Middle ring/rectangle */}
            <View style={styles.absoluteCenter}>
                <Image
                    source={require('@/assets/images/starmate/sm_rec.png')}
                    style={{ width: recSize, height: recSize }}
                    contentFit="contain"
                />
            </View>

            {/* Inner layer */}
            <View style={styles.absoluteCenter}>
                <Image
                    source={require('@/assets/images/starmate/sm_layer.png')}
                    style={{ width: layerSize, height: layerSize }}
                    contentFit="contain"
                />
            </View>

            {/* Title above the inner layer */}
            <Text style={[textStyle.subTitle1, styles.title, { top: titleTop }]}>{title}</Text>

            {/* Score text in the center */}
            <Text style={[textStyle.textBold3, styles.score, { lineHeight: 44 }]}>{`${score}`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    absolute: {
        position: 'absolute',
        alignSelf: 'center',
    },
    absoluteCenter: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        position: 'absolute',
        textAlign: 'center',
        color: colors.black3,
        fontSize: 16
    },
    score: {
        textAlign: 'center',
        color: colors.black3,
        fontSize: 24,
    },
});


