import { StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions } from 'react-native';
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
                outputRange: [0, (width / 2) - spacing.large],
            })
        }]
    };

    return (
        <View style={styles.periodContainer}>
            <Animated.View style={[styles.animatedBackground, animatedStyle]} />
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

const { width } = Dimensions.get('window');
const TAB_WIDTH = (width - (spacing.large * 2)) / 2;

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
        width: TAB_WIDTH,
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