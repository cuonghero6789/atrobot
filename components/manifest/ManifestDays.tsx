import Colors from "@/styles/Colors";
import spacing from "@/styles/spacing";
import TypeStyles from "@/styles/TypeStyle";
import { memo, useCallback, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

function ManifestDays() {
    const [selected, setSelected] = useState<number>(0);

    const onPress = useCallback((index: number) => {
        setSelected(index);
    }, [selected]);

    return <View style={styles.container}>
        <TouchableOpacity onPress={() => onPress(0)} style={selected == 0 ? styles.btnSelected : styles.btn}>
            <Text style={[TypeStyles.bodyTextBold, selected == 0 ? styles.textSelected : styles.text]}>{"Hôm này"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress(1)} style={selected == 1 ? styles.btnSelected : styles.btn}>
            <Text style={[TypeStyles.bodyTextBold, selected == 1 ? styles.textSelected : styles.text]}>{"Tuần này"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress(2)} style={selected == 2 ? styles.btnSelected : styles.btn}>
            <Text style={[TypeStyles.bodyTextBold, selected == 2 ? styles.textSelected : styles.text]}>{"Tháng này"}</Text>
        </TouchableOpacity>
    </View>
}

export default memo(ManifestDays);

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        paddingHorizontal: spacing.padding.base,
        paddingVertical: spacing.padding.xSmall,
        borderColor: Colors.white,
        borderWidth: 2
    },
    btnSelected: {
        backgroundColor: "#357FE99C",
        borderRadius: 20,
        paddingHorizontal: spacing.padding.base,
        paddingVertical: spacing.padding.xSmall,
        borderColor: Colors.white,
        borderWidth: 2
    },
    text: {
        color: Colors.green
    },
    textSelected: {
        color: Colors.white
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        paddingTop: spacing.padding.big,
        paddingBottom: spacing.padding.large
    }
});