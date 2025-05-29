import { colors, spacing } from "@/core/styles";
import { ItemPickerModel } from "@/core/types/atro";
import { memo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
interface Props {
    title: string;
    onSelected: (text: string) => void;
    text: string;
    data: ItemPickerModel[];
}

function ChooseList({ onSelected, text, data, title }: Props) {
    return <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {
            data.map((item, index) => {
                return <TouchableOpacity onPress={() => onSelected(item.value)} key={`relationship-${index}`} style={text === item.value ? styles.btnSelect : styles.btn}>
                    <Text style={styles.text}>{item.label}</Text>
                </TouchableOpacity>
            })
        }
    </View>
}

export default memo(ChooseList);

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: colors.surfaceCard,
        marginBottom: spacing.sm
    },
    container: {
        padding: spacing.lg,
        alignItems: 'flex-start',
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21,
        color: colors.borderLighter
    },
    btnSelect: {
        marginVertical: spacing.sm,
        backgroundColor: colors.success,
        borderRadius: spacing.lg,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md
    },
    btn: {
        backgroundColor: colors.successLight,
        borderRadius: spacing.lg,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        marginVertical: spacing.sm,
    }
});