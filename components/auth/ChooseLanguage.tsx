import { colors } from "@/core/styles";
import useAccountStore from "@/core/stores/common/AccountStore";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserModel } from "@/core";

function ChooseLanguage() {
    const user = useAccountStore(state => state.user);
    const actions = useAccountStore(state => state.actions);
    return (
        <View
            style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    actions.setAccount({ ...user, language_code: 'en' } as UserModel);
                }}
                style={{ padding: 6 }}>
                <Text
                    style={
                        user?.language_code === 'en'
                            ? styles.txtLangSelected
                            : styles.txtLang
                    }>
                    {'EN'}
                </Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
                onPress={() => {
                    actions.setAccount({ ...user, language_code: 'vi' } as UserModel);
                }}
                style={{ padding: 6 }}>
                <Text
                    style={
                        user?.language_code === 'vi'
                            ? styles.txtLangSelected
                            : styles.txtLang
                    }>
                    {'VI'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
export default memo(ChooseLanguage);

const styles = StyleSheet.create({
    line: {
        height: 12,
        width: 1,
        backgroundColor: colors.white
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtLang: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.textGray,
    },
    txtLangSelected: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black,
    },
});