import Colors from "@/constants/Colors";
import spacing from "@/constants/spacing";
import { replationships } from "@/data";
import { memo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function ChooseRelationship() {
    const [relationShip, setRelationShip] = useState<string>(replationships[0].value);

    return <View style={styles.container}>
        <Text style={styles.title}>{"i am:*"}</Text>
        {
            replationships.map((item, index) => {
                return <TouchableOpacity onPress={() => setRelationShip(item.value)} key={`relationship-${index}`} style={relationShip === item.value ? styles.btnSelect : styles.btn}>
                    <Text style={styles.text}>{item.label}</Text>
                </TouchableOpacity>
            })
        }
    </View>
}

export default memo(ChooseRelationship);

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: Colors.black1,
        marginBottom: spacing.margin.small
    },
    container: {
        padding: spacing.borderRadius.extraLarge,
        alignItems: 'flex-start',
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21,
        color: Colors.line2
    },
    btnSelect: {
        marginVertical: spacing.margin.small,
        backgroundColor: Colors.green,
        borderRadius: spacing.borderRadius.extraLarge,
        paddingVertical: spacing.padding.xSmall,
        paddingHorizontal: spacing.padding.extraLarge
    },
    btn: {
        backgroundColor: Colors.green2,
        borderRadius: spacing.borderRadius.extraLarge,
        paddingVertical: spacing.padding.xSmall,
        paddingHorizontal: spacing.padding.extraLarge,
        marginVertical: spacing.margin.small,
    }
});