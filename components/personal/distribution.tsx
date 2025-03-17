import React, { memo } from "react"
import { View, Text, StyleSheet } from "react-native"
import Colors from "@/styles/Colors"
import { Image } from "expo-image"
import spacing from "@/styles/spacing"
import TypeStyles from "@/styles/TypeStyle"

interface Props {
    icon?: any,
    title?: string,
    description?: string,
    style?: any
}

const Distribution = ({ icon, title, description, style }: Props) => {
    return (
        <View style={{ width: '50%', alignItems: 'center', paddingBottom: spacing.padding.big }}>
            <View style={[styles.wrapper, style]}>
                <Image source={icon} style={styles.icon} tintColor={Colors.white} contentFit="contain" />
                <View style={{ paddingHorizontal: spacing.padding.base }}>
                    <Text style={[TypeStyles.subTitleMedium1, styles.title]}>{title}</Text>
                    <Text style={[TypeStyles.textBold2, styles.description]}>{description}</Text>
                </View>
            </View>
        </View>
    )
}
const InfoChartProperties = ({ icon, title, description }: Props) => {
    return (
        <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Image source={icon} style={styles.icon} tintColor={Colors.white} contentFit="contain" />
            <Text style={[TypeStyles.subTitleMedium1, { fontSize: 14, marginVertical: spacing.padding.xTiny, textAlign: 'center' }]}>{title}</Text>
            <Text style={[TypeStyles.textBold2, styles.description]}>{description}</Text>
        </View>
    )
}

export {
    Distribution,
    InfoChartProperties
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 40,
        height: 40,
    },
    title: {
        fontSize: 16,
    },
    description: {
        fontSize: 14,
        color: Colors.black,
        textAlign: 'center'
    }
})