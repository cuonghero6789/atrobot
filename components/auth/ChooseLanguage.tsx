import Colors from "@/styles/Colors";
import useAccountStore from "@/stores/AccountStore";
import useAuthStore from "@/stores/AuthStore";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function ChooseLanguage() {
    const user = useAccountStore(state => state.user);
    const actions = useAccountStore(state => state.actions);
    return (
        <View
            style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    actions.setAccount({ ...user, language_code: 'en' });
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
                    actions.setAccount({ ...user, language_code: 'vi' });
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
        backgroundColor: Colors.white
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtLang: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.gray3,
    },
    txtLangSelected: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black,
    },
});