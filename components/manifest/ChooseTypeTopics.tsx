import { ASTROME_GEN_QUESTION } from "@/core/apollo/mutations";
import { Topics, TopicsEnum } from "@/core/data";
import { useQuestionStore } from "@/core/stores";
import { colors, spacing, textStyle } from "@/core/styles";
import { useMutation } from "@apollo/client";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { memo, useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

function ChooseTypeTopics() {
    const [AstroGenQuestion, { data, loading, error }] =
        useMutation(ASTROME_GEN_QUESTION);
    const actions = useQuestionStore(state => state.actions);
    const [type, setType] = useState<String | null>(null);

    useEffect(() => {
        if (!type) {
            setType(TopicsEnum.Self);
            AstroGenQuestion({
                variables: {
                    topic: TopicsEnum.Self,
                },
            });
        }
    }, [type]);

    return <View style={styles.contaner}>
        {Topics.map((item, index) => {
            return <TouchableOpacity style={{ alignItems: 'center' }} key={`topic-${index}`} onPress={() => {
                if (type === item.type) return;
                setType(item.type);
                actions.setTopic({ ...item, sourceSelect: item.source });
                AstroGenQuestion({
                    variables: {
                        topic: item.type,
                    },
                });
            }}>
                <LinearGradient
                    colors={type === item.type ? ['#2D79E5', '#274877'] : ['#B2D1FD', '#EBEDF0']}
                    style={type === item.type ? styles.gradienIconSelect : styles.gradienIcon}
                >
                    <Image source={item.source} style={styles.icon} />
                </LinearGradient>
                <Text style={[textStyle.btnSecondary, { marginTop: spacing.sm, color: colors.surfaceElevated }]}>{item.name}</Text>
            </TouchableOpacity>
        })}
    </View>
}

export default memo(ChooseTypeTopics);

const styles = StyleSheet.create({
    contaner: {
        paddingHorizontal: spacing.large,
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
        borderColor: colors.white,
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