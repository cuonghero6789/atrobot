import { StyleSheet, Text, TouchableOpacity, View, Animated, useWindowDimensions } from 'react-native';
import { textStyle } from '@/core/styles';
import { spacing } from '@/core/styles';
import { useEffect, useRef } from 'react';
import strings from '@/core/localization';

type PeriodSelectorProps = {
    selectedPeriod: 'week' | 'month';
    onPeriodChange: (period: 'week' | 'month') => void;
};

export const PeriodSelector = ({ selectedPeriod, onPeriodChange }: PeriodSelectorProps) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const { width: screenWidth } = useWindowDimensions();
    // Clamp width on large screens (web fullscreen) for better readability
    const containerWidth = Math.min(screenWidth - (spacing.large * 2), 720);
    const tabWidth = containerWidth / 2;

    useEffect(() => {
        Animated.spring(translateX, {
            toValue: selectedPeriod === 'week' ? 0 : 1,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
        }).start();
    }, [selectedPeriod]);

    const animatedStyle = {
        transform: [{
            translateX: translateX.interpolate({
                inputRange: [0, 1],
                outputRange: [0, tabWidth],
            })
        }]
    };

    return (
        <View style={[styles.periodContainer, { width: containerWidth, alignSelf: 'center' }]}>
            <Animated.View style={[styles.animatedBackground, animatedStyle, { width: tabWidth }]} />
            <TouchableOpacity
                style={[styles.periodTab]}
                onPress={() => onPeriodChange('week')}
            >
                <Text style={[
                    styles.periodText,
                    textStyle.textBold3,
                ]}>{strings.t("week")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.periodTab]}
                onPress={() => onPeriodChange('month')}
            >
                <Text style={[
                    styles.periodText,
                    textStyle.textBold3,
                ]}>{strings.t("month")}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    periodContainer: {
        marginHorizontal: spacing.large,
        flexDirection: 'row',
        backgroundColor: '#D9D9D9',
        borderRadius: 15,
        marginVertical: spacing.large,
        shadowColor: '#D9D9D9',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3.84,
        elevation: 5,
    },
    periodTab: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    animatedBackground: {
        position: 'absolute',
        height: '100%',
        backgroundColor: '#74A7EE',
        borderRadius: 15,
    },
    periodText: {
        ...textStyle.text,
        color: '#fff',
    },
    periodTextActive: {
        color: '#fff',
        fontWeight: '600',
    },
}); 