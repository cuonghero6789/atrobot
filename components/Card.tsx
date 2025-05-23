import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/styles/Colors';
import { CAROUSEL_HEIGHT, CAROUSEL_WIDTH } from './Carousel';
import TypeStyles from '@/styles/TypeStyle';
import { Image } from 'expo-image';
import spacing from '@/styles/spacing';
const images = {
    emotion: require('@/assets/images/daily/ic_heath.svg'),
    career: require('@/assets/images/daily/ic_career.svg'),
    love: require('@/assets/images/daily/ic_love.svg'),
    money: require('@/assets/images/daily/ic_finance.svg'),
};

import { DailyModel, ScoreModel } from '@/models/ItemModel';
import strings from '@/localization';
interface CardProps {
    daily?: DailyModel,
    contanerStyle?: any,
    style?: any,
    description?: string,
    textStyle?: any,
    score?: ScoreModel,
    name?: string,
}

const Card = ({ daily, score }: CardProps) => {
    const { key, text } = daily || {};
    const imageToDisplay = images[key as keyof typeof images] || images.emotion;
    const label = strings.t(`daily_${key}`) ?? "SỰ NGHIỆP";

    return <LinearGradient
        colors={['rgba(45, 121, 229, 0.52)', 'rgba(39, 72, 119, 0.72)']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
    >
        <View style={[styles.card]}>
            <View style={{ alignItems: 'center' }}>
                <Image source={imageToDisplay ?? require('@/assets/images/ic_carier.png')} style={{ width: 43, height: 43 }} />
                <Text style={[TypeStyles.btnSecondary, { color: Colors.white }]}>{`${label}`}</Text>
                <Text style={[TypeStyles.subTitle, { color: Colors.white }]}>{`${score?.score}`}</Text>
            </View>
            <Text style={[TypeStyles.bodyText3, styles.text]}>{text}</Text>
        </View>
    </LinearGradient>
};

const CardView = ({ contanerStyle, style, description, textStyle, name }: CardProps) => {
    return <View style={[styles.gradientView, contanerStyle]}>
        <LinearGradient
            colors={["#395784BF", "#357FE9BF"]}
            style={[{ flex: 1, borderRadius: 20, borderWidth: 2, borderColor: Colors.white }, style]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
        >
            <View style={{ flex: 1, padding: spacing.padding.large }}>
                <Text style={[TypeStyles.subTitle1, { color: Colors.white }, textStyle]}>{description || strings.t("recommendation").replace("{name}", name || "")}</Text>
            </View>
        </LinearGradient>
    </View>
}
const CardItem = () => {
    return <View style={styles.gradientItem}>
        <LinearGradient
            colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0)']}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ddd",
    },
    gradientItem: {
        flex: 1,
        height: 500,
        borderRadius: 30,
        backgroundColor: "#7EADF1A6",//7EADF1A6
        shadowOffset: {
            width: 6,
            height: 6
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        shadowColor: "white",
    },
    gradientView: {
        flex: 1,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.4, // Similar to #00000052
        shadowRadius: 4,
        // elevation: 6, // Required for Android
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: spacing.padding.large
    },
    text: {
        color: '#fff',
        flex: 1,
        marginLeft: spacing.padding.large
    },
});

const MemoizedCard = React.memo(Card);
const MemoizedCardView = React.memo(CardView);
const MemoizedCardItem = React.memo(CardItem);

export {
    MemoizedCard as Card,
    MemoizedCardView as CardView,
    MemoizedCardItem as CardItem,
};