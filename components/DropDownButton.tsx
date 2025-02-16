import { memo } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Colors from "@/constants/Colors";
import { ItemPickerModel } from "@/models/ItemModel";
import spacing from "@/constants/spacing";
interface Props {
    onPress?: () => void;
    item?: ItemPickerModel;
    title?: string;
}

function DropDownButton({ onPress, item, title }: Props) {
    return <View>
        {title && <Text style={styles.title}>{title}</Text>}
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={item?.value ? styles.text : styles.placeHolder}>{item?.label || "choose language*"}</Text>
            <EvilIcons name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
    </View>
}

export default memo(DropDownButton);

const styles = StyleSheet.create({
    title: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: spacing.padding.small
    },
    container: {
        backgroundColor: '#FFFFFFB2',
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: '#B4C9CF80',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    placeHolder: {
        color: '#84929E',
        fontSize: 14,
        fontWeight: '400'
    },
    text: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: '400'
    }
});
