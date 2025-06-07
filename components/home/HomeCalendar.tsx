import { colors, spacing, textStyle } from "@/core/styles";
import { memo, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import moment from "moment";
import strings from "@/core/localization";
import "moment/locale/vi"; // Import the Vietnamese locale
import { useAccountStore } from "@/core/stores";

function HomeCalendar() {
    const user = useAccountStore(state => state.user);
    moment.locale(user?.language_code);
    const currentDate = moment();

    return <View style={styles.container}>
        <Text style={[textStyle.subTitleMedium, { color: colors.white }]}>
            {currentDate.format("MMMM").toUpperCase()}
        </Text>
        <Text style={[textStyle.largeText, { color: colors.white }]}>
            {currentDate.format("DD")}
        </Text>
        <Text style={[textStyle.subTitleMedium, { color: colors.white }]}>
            {currentDate.format("dddd")}
        </Text>
    </View>
}

export default memo(HomeCalendar);

const styles = StyleSheet.create({
    container: {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        paddingHorizontal: spacing.large,
        paddingVertical: spacing.lg,
        justifyContent: 'center',
        backgroundColor: '#3033369C',
        shadowColor: '#303336',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    }
});