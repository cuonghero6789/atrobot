import Colors from "@/styles/Colors";
import spacing from "@/styles/spacing";
import TypeStyles from "@/styles/TypeStyle";
import { memo } from "react";
import { View, StyleSheet, Text } from "react-native";

function HomeCalendar() {
    return <View style={styles.container}>
        <Text style={[TypeStyles.subTitleMedium, { color: Colors.white }]}>{"FEB"}</Text>
        <Text style={[TypeStyles.largeText, { color: Colors.white }]}>{"25"}</Text>
        <Text style={[TypeStyles.subTitleMedium, { color: Colors.white }]}>{"Monday"}</Text>
    </View>
}

export default memo(HomeCalendar);

const styles = StyleSheet.create({
    container: {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        paddingHorizontal: spacing.padding.large,
        paddingVertical: spacing.padding.extraLarge,
        justifyContent: 'center',
        backgroundColor: '#3033369C',
        shadowColor: '#303336',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    }
});