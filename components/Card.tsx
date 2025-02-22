import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/styles/Colors';
import { CAROUSEL_HEIGHT, CAROUSEL_WIDTH } from './Carousel';
import TypeStyles from '@/styles/TypeStyle';
import { Image } from 'expo-image';
import spacing from '@/styles/spacing';

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

const styles = StyleSheet.create({
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

export default Card;