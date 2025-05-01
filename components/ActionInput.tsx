import Colors from '@/styles/Colors';
import spacing from '@/styles/spacing';
import TypeStyles from '@/styles/TypeStyle';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
interface Props {
    placeholder: string;
    name?: string;
    onPress: (text: string) => void;
}

const ActionInput = ({ placeholder, name, onPress }: Props) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [text, setText] = React.useState('');
    return (
        <View style={{ paddingTop: spacing.padding.small }}>
            {name && <Text style={[TypeStyles.bodyTextBold, styles.text]}>{name}</Text>}
            <View
                style={[styles.btn, isFocused ? { justifyContent: 'space-between' } : null]}
            >
                <TextInput
                    style={[isFocused && styles.inputFocus, { alignItems: 'center', color: Colors.white, paddingVertical:4 }]}
                    placeholder={placeholder}
                    value={text}
                    placeholderTextColor={Colors.white}
                    focusable
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={(text) => setText(text)}
                />
                {
                    text.length > 0 &&
                    <TouchableOpacity onPress={() => onPress(text)}>
                        <Feather name="send" size={24} color={Colors.white} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};
export default ActionInput;

const styles = StyleSheet.create({
    btn: {
        borderRadius: 8,
        borderColor: Colors.white,
        borderWidth: 2,
        padding: spacing.padding.small,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    borderOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    text: {
        color: Colors.black3,
        marginBottom: 8,
    },
    inputFocus: {
        borderColor: Colors.white,
        justifyContent: 'space-between',
    },
    textInput: {
        borderRadius: spacing.borderRadius.base,
        paddingVertical: spacing.padding.small,
        paddingHorizontal: spacing.padding.base,
        backgroundColor: Colors.bgColor5,
        marginRight: spacing.margin.small,
        borderColor: Colors.bgColor3,
        borderWidth: 1,
        fontSize: 16,
        height: 56,
        color: Colors.gray2,
    },
});
