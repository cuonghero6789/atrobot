import React, { memo } from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors, spacing, textStyle } from "@/core/styles"
import { Image } from "expo-image"

interface Props {
    icon?: any,
    title?: string,
    description?: string,
    style?: any
}

const Distribution = ({ icon, title, description, style }: Props) => {
    return (
        <View style={{ width: '50%', alignItems: 'center', paddingBottom: spacing.xl }}>
            <View style={[styles.wrapper, style]}>
                <Image source={icon} style={styles.icon} tintColor={colors.white} contentFit="contain" />
                <View style={{ paddingHorizontal: spacing.ssm }}>
                    <Text style={[textStyle.subTitleMedium1, styles.title]}>{title}</Text>
                    <Text style={[textStyle.textBold2, styles.description]}>{description}</Text>
                </View>
            </View>
        </View>
    )
}
const InfoChartProperties = ({ icon, title, description }: Props) => {
    return (
        <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Image source={icon} style={styles.icon} tintColor={colors.white} contentFit="contain" />
            <Text style={[textStyle.subTitleMedium1, { fontSize: 14, marginVertical: spacing.xTiny, textAlign: 'center' }]}>{title}</Text>
            <Text style={[textStyle.textBold2, styles.description]}>{description}</Text>
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
        color: colors.black,
        textAlign: 'center'
    }
})