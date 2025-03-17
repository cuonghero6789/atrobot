import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/styles/Colors';
import { CAROUSEL_HEIGHT, CAROUSEL_WIDTH } from './Carousel';
import TypeStyles from '@/styles/TypeStyle';
import { Image } from 'expo-image';
import spacing from '@/styles/spacing';
interface CardProps {
    contanerStyle?: any,
    style?: any,
    description?: string,
    textStyle?: any,
}
const Card = () => {
    return <LinearGradient
        colors={['rgba(45, 121, 229, 0.52)', 'rgba(39, 72, 119, 0.72)']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
    >
        <View style={[styles.card]}>
            <View style={{ alignItems: 'center' }}>
                <Image source={require('@/assets/images/ic_carier.png')} style={{ width: 43, height: 43 }} />
                <Text style={[TypeStyles.btnSecondary, { color: Colors.white }]}>{"SỰ NGHIỆP"}</Text>
                <Text style={[TypeStyles.subTitle, { color: Colors.white }]}>{"2/5"}</Text>
            </View>
            <Text style={[TypeStyles.bodyText3, styles.text]}>{"Mặt trăng 120 độ sao Thủy, Xử Nữ không nên đưa ra những lời chỉ trích quá gay gắt đối với những người thân thiết của mình."}</Text>
        </View>
    </LinearGradient>
};

const CardView = ({ contanerStyle, style, description, textStyle }: CardProps) => {
    return <View style={[styles.gradientView, contanerStyle]}>
        <LinearGradient
            colors={["#395784BF", "#357FE9BF"]}
            style={[{ flex: 1, borderRadius: 20, borderWidth: 2, borderColor: Colors.white }, style]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
        >
            <View style={{ flex: 1, padding: spacing.padding.large }}>
                <Text style={[TypeStyles.subTitle1, { color: Colors.white }, textStyle]}>{description || "Chào Quỳnh Anh, Bạn có dự định gì sắp tới không? Hãy để các vì sao tiết lộ điều gì đang chờ đón bạn! 😉"}</Text>
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
        elevation: 6, // Required for Android
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

export {
    Card,
    CardView,
    CardItem,
};