import { memo } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Colors from "@/styles/Colors";
import { ItemPickerModel } from "@/models/ItemModel";
import spacing from "@/styles/spacing";
interface Props {
    onPress?: () => void;
    item?: ItemPickerModel;
    title?: string;
    placeholder?: string;
    styleText?: any;
    styleContainer?: any;
    styleTitle?: any;
    stylePlaceHolder?: any;
}

function DropDownButton({ onPress, item, title, placeholder = "choose language*", styleText, styleContainer, styleTitle, stylePlaceHolder }: Props) {
    return <View style={styleContainer}>
        {title && <Text style={[styles.title, styleTitle]}>{title}</Text>}
        <TouchableOpacity onPress={onPress} style={[styles.container]}>
            <Text style={[item?.value ? styles.text : styles.placeHolder, styleText]}>{item?.label || placeholder}</Text>
            <EvilIcons name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
    </View>
}

export default memo(DropDownButton);

const styles = StyleSheet.create({
    title: {
        color: Colors.black3,
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
        alignItems: 'center',
        padding: 10,
        minHeight: 48
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
