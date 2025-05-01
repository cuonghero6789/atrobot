import { BackButton } from "@/components/Button";
import { Image, ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { memo, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { CardItem, CardView } from "@/components/Card";
import spacing from "@/styles/spacing";
import InnerShadowBox from "@/components/InnerShadowBox";
import ChooseTypeTopics from "@/components/manifest/ChooseTypeTopics";
import { ASTROME_ANSWER_QUESTION, ASTROME_GEN_QUESTION } from "@/apollo/mutation";
import { useMutation } from "@apollo/client";
import useQuestionStore from "@/stores/QuestionStore";
import { TopicsEnum } from "@/data";

function QuestionsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [AstroGenQuestion, { data, loading, error }] =
        useMutation(ASTROME_GEN_QUESTION);
    const [
        AstroAnswerQuestion,
        { data: dataAnswer, loading: loadingAnswer, error: errorAnswer },
    ] = useMutation(ASTROME_ANSWER_QUESTION);
    const questions = useQuestionStore(state => state.questions);
    const questionsLove = useQuestionStore(state => state.questionsLove);
    const questionsMood = useQuestionStore(state => state.questionsMood);
    const questionsCare = useQuestionStore(state => state.questionsCare);
    const actions = useQuestionStore(state => state.actions);
    const topic = useQuestionStore(state => state.topic);
    const list =
        topic?.type === TopicsEnum.Love
            ? questionsLove
            : topic?.type === TopicsEnum.Mood
                ? questionsMood
                : topic?.type === TopicsEnum.Work
                    ? questionsCare
                    : topic?.type === TopicsEnum.Self
                        ? questions
                        : [];

    return <ImageBackground source={require('@/assets/images/bg_home.png')} style={{ flex: 1, paddingTop: insets.top }}>
        <BackButton onPress={() => router.back()} />
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.padding.large, paddingBottom: spacing.padding.big }}>
                <CardView contanerStyle={{ paddingBottom: spacing.padding.extraLarge, marginHorizontal: spacing.margin.large }} />
                <ChooseTypeTopics />
                <InnerShadowBox
                    data={list}
                    onPress={(text: string) => {
                        AstroAnswerQuestion({
                            variables: {
                                topic: topic?.type,
                                question: text,
                            },
                        });
                        router.push({
                            pathname: '/AnswerScreen',
                            params: {
                                id: 1,
                            }
                        })
                    }}
                    colorStart="#FFFFFFBF"
                    colorEnd="#357FE999"
                    iconSource={require('@/assets/images/ic_mode.png')} />
                <InnerShadowBox
                    data={list}
                    onPress={() => { }}
                    colorStart="#FFFFFFBF"
                    colorEnd="#21476D9E"
                    iconSource={require('@/assets/images/ic_mode1.png')} />
                <InnerShadowBox
                    data={list}
                    onPress={() => { }}
                    colorStart="#FFFFFFBF"
                    colorEnd="#0E0F3C99"
                    iconSource={require('@/assets/images/ic_mode3.png')} />
            </ScrollView>
        </KeyboardAvoidingView>
    </ImageBackground>
}

export default memo(QuestionsScreen);

const styles = StyleSheet.create({

});