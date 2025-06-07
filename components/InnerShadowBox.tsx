import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from 'react-native';
import { colors, spacing, textStyle } from '@/core/styles';
import { Button } from "./Button";
import ActionInput from "./ActionInput";
import { SkeletonLoaderEvent, SkeletonLoaderQuestion } from "./loading/LoadingView";
import { useQuestionStore } from "@/core/stores";
import { ASTROME_GEN_QUESTION } from "@/core/apollo/mutations";
import { useMutation } from "@apollo/client";
import { setLoadingQuestion } from "@/core/stores/actions/atro/QuestionAction";

interface Props {
    colorStart: string;
    colorEnd: string;
    iconSource: any;
    onPress: (text: string) => void;
    data?: string[];
    type?: string;
}

export default function InnerShadowBox({ colorStart, colorEnd, iconSource, onPress, data, type }: Props) {
    const loadingQuestion = useQuestionStore(state => state.loadingQuestion);
    const actions = useQuestionStore(state => state.actions);
    const [AstroGenQuestion, { data: dataGenQuestion, loading: loadingGenQuestion, error: errorGenQuestion }] =
        useMutation(ASTROME_GEN_QUESTION);

    return (
        <LinearGradient
            colors={[colorStart, colorEnd]}
            style={styles.box}
        >
            <LinearGradient
                colors={["#7EADF1A6", colors.white]}
                start={{ x: 0.9, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.innerShadow}
            />
            <LinearGradient
                colors={["#7EADF1A6", colors.white]}
                start={{ x: 0, y: 0.9 }}
                end={{ x: 0, y: 1 }}
                style={styles.innerShadow}
            />
            <Image
                source={iconSource}
                resizeMode="contain"
                style={styles.iconImage}
            />
            <Text style={[textStyle.textBold2, styles.questionText]}>
                {"Kế hoạch sắp tới của\ntôi có suôn sẻ không?"}
            </Text>
            <View style={styles.suggestionHeader}>
                <View style={styles.suggestionLine} />
                <Text style={[textStyle.bodyTextBold, styles.suggestionText]}>
                    {"Câu hỏi gợi ý"}
                </Text>
            </View>
            {data && data?.length <= 0 || loadingQuestion ? (
                <View style={styles.skeletonContainer}>
                    <SkeletonLoaderQuestion />
                </View>
            )
                : data?.map((item, index) => (
                    <Button
                        key={`key_${index}`}
                        title={item}
                        onPress={() => onPress(item)}
                        containerStyle={styles.suggestionButton}
                        textStyle={textStyle.subTitleMedium1}
                        buttonStyle={styles.suggestionButtonStyle}
                    />
                ))
            }
            <TouchableOpacity onPress={() => {
                actions.setLoadingQuestion(true);
                AstroGenQuestion({
                    variables: {
                        topic: type,
                    },
                });
            }} style={styles.moreButton}>
                <Text style={[textStyle.textBold3, { color: colors.white }]}>
                    {"Gợi ý thêm"}
                </Text>
            </TouchableOpacity>
            <ActionInput
                placeholder="Hoặc tự viết câu hỏi của bạn"
                onPress={(text) => onPress(text)}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        marginTop: spacing.large,
        borderRadius: spacing.xl,
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
        paddingBottom: spacing.bigx2,
        overflow: "hidden",
        position: "relative",
    },
    innerShadow: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: spacing.xl,
        opacity: 0.7,
    },
    iconImage: {
        width: 130,
        height: 156,
        position: 'absolute',
        right: spacing.sm,
        top: spacing.large,
    },
    questionText: {
        color: colors.white,
    },
    suggestionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    suggestionLine: {
        height: 21,
        width: 2,
        backgroundColor: colors.white,
    },
    suggestionText: {
        color: colors.white,
        marginHorizontal: spacing.sm,
    },
    skeletonContainer: {
        width: '100%',
        paddingTop: spacing.md,
    },
    suggestionButton: {
        marginTop: spacing.sm,
        borderRadius: spacing.xxs,
        minHeight: 64,
    },
    suggestionButtonStyle: {
        borderRadius: spacing.xxs,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.ssm,
    },
    moreButton: {
        borderRadius: spacing.sm,
        borderColor: colors.white,
        borderWidth: 2,
        padding: spacing.sm,
        marginTop: spacing.sm,
        alignItems: 'center',
    },
});