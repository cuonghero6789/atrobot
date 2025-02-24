import { Topics, TopicsEnum } from "@/data";
import Colors from "@/styles/Colors";
import spacing from "@/styles/spacing";
import TypeStyles from "@/styles/TypeStyle";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { memo, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

function ChooseTypeTopics() {
    const [type, setType] = useState<String>(TopicsEnum.Self);

    return <View style={styles.contaner}>
        {Topics.map((item, index) => {
            return <TouchableOpacity style={{ alignItems: 'center' }} key={`topic-${index}`} onPress={() => setType(item.type)}>
                <LinearGradient
                    colors={type === item.type ? ['#2D79E5', '#274877'] : ['#B2D1FD', '#EBEDF0']}
                    style={type === item.type ? styles.gradienIconSelect : styles.gradienIcon}
                >
                    <Image source={item.source} style={styles.icon} />
                </LinearGradient>
                <Text style={[TypeStyles.btnSecondary, { marginTop: spacing.margin.small, color: Colors.black3 }]}>{item.name}</Text>
            </TouchableOpacity>
        })}
    </View>
}

export default memo(ChooseTypeTopics);

const styles = StyleSheet.create({
    contaner: {
        paddingHorizontal: spacing.padding.large,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    gradienIconSelect: {
        width: 54,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: Colors.white,
        borderWidth: 1
    },
    gradienIcon: {
        width: 54,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    icon: {
        width: 41,
        height: 41
    }
});